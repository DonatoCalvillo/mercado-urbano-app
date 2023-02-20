import { FC, useContext, useEffect, useState } from "react";
import { Alert, Box, FormControl, InputLabel, MenuItem, Select, Snackbar, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { mercadoUrbanoApi } from 'api';
import { AuthContext } from "context";
import Cookies from 'js-cookie';
import { ILugares, ILugar, ILugarSeleccionado } from '../../../interfaces/ILugares';


interface Props {
  inscrito: number;
  fechaInscripcion: string;
  numeroLugar: string | null;
}

export const Zone:FC<Props> = ({ inscrito, fechaInscripcion, numeroLugar }) => {
  const [status, setStatus] = useState("Inscrito")
  const [open, setOpen] = useState(false);
  const [lugares, setLugares] = useState<ILugares[]>()
  const [lugarSeleccionado, setLugarSeleccionado] = useState('')
  const [snackMessage, setSnackMessage] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [lugarRegistrado, setLugarRegistrado] = useState<string | null>(numeroLugar)
  const { user } = useContext( AuthContext )
  

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleInputChange = (event:any) => {
    setLugarSeleccionado( event.target.value )
  }


  useEffect(()=>{
    if(inscrito === 1)
      setStatus("Inscrito")
    else if (inscrito === 0)
      setStatus("Inscripcion")
  },[])

  const reservar = async () => {

    const token = Cookies.get('token')?.toString()

    try{
      const { data } = await mercadoUrbanoApi.get('/event/validateInscription',{
        headers: { 'Authorization' : `bearer ${token}` }
      })

      if( data.status === "OK")
        setStatus("Registro")

      getLugares(token)

      console.log(lugares)
      
    }catch(error){
      setSnackMessage('Aún no es tu fecha de inscripción')
      handleClick()
      console.log(error)
    }
  }

  const elegirLugar = async () => {
    const token = Cookies.get('token')?.toString()
    try{
      const { data } = await mercadoUrbanoApi.post<ILugarSeleccionado>('/event/setLugar',{
        "fk_lugar": lugarSeleccionado
      }, {
        headers: { 'Authorization' : `bearer ${token}` }
      })

      console.log(lugarSeleccionado)
      const { status, lugar, message } = data

      if(status === "OK"){
        setLugarRegistrado(lugar)
        setStatus("Inscrito")
      }

      setSnackMessage(message)
      setStatusMessage(status)

      handleClick()

      console.log(data)
    }catch(error){
      console.log(error)
    }
  }

  const getLugares = async (token: any) => {
    try{
      const { data } = await mercadoUrbanoApi.get('/event/getLugares',{
        headers: { 'Authorization' : `bearer ${token}` }
      })

      setLugares(data)

    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
      {
        status === 'Inscrito' && (
          <Box display="flex" alignItems="center" maxWidth="350px">
            <Typography variant="h6" color="#707070">
              Tu zona es:
            </Typography>
            <Typography variant="h6" marginLeft="10px" fontSize="55px" color="#707070">
              { lugarRegistrado }
            </Typography>
          </Box>
        ) 
      }

      {
        status === "Inscripcion" && (
          <Box  display="flex" alignItems="center" maxWidth="350px" flexDirection="column"> 
            <Typography variant="h6" color="#707070" textAlign="center" marginBottom="20px">
              El registro te toca el {fechaInscripcion}
            </Typography>
            <Button onClick={reservar} variant="outlined" style={{ padding: "10px 20px", color: "#707070", borderColor: "#707070" }}>Reservar</Button>
          </Box>
          )
      }
      
      {
        status === "Registro" && (
          <Box  display="flex" alignItems="center" maxWidth="350px" flexDirection="column">
            <Box display="flex">
              <Typography variant="h6" marginRight="20px" color="#707070" textAlign="center" marginBottom="20px">
                Lugar deseado:
              </Typography>
              <FormControl fullWidth>
                <InputLabel onChange={handleInputChange} id="demo-simple-select-label">Lugar</InputLabel>
                <Select
                  onChange={handleInputChange}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Zona"
                >
                  {
                    lugares?.map((lugar, index) =>{
                      return <MenuItem key={index} value={lugar.lugar_id}>{lugar.area_nombre[0]}{lugar.lugar_numero}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Button onClick={elegirLugar} fullWidth color="success" variant="outlined" style={{ padding: "10px 20px", marginRight: "20px" }}>Confirmar</Button>
              <Button onClick={() => setStatus("Inscripcion")} fullWidth color="error" variant="outlined" style={{ padding: "10px 20px" }}>Cancelar</Button>
            </Box>
          </Box>
          )
      }

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={ statusMessage === "OK" ? "success" : "error" } sx={{ width: '500px' }}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </>
  )
}
