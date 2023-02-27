import { Box, Button, Container, Input, Select, Typography, MenuItem, InputLabel, FormControl, Snackbar, Alert } from '@mui/material';
import { mercadoUrbanoApi } from 'api';
import { UserLayout } from 'components/layouts'
import saveAs from 'file-saver';
import Cookies from 'js-cookie';
import { GetStaticProps } from 'next';
import React, { ChangeEvent, FC, useRef } from 'react'
import { useState } from 'react';
import { IEventos } from '../../../../interfaces/IEvento';

interface Props {
  eventos: IEventos[]
}

const CargaArchivos: FC<Props> = ({ eventos }) => {

  const [open, setOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('')
  const [statusMessage, setStatusMessage] = useState('')

  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null)

  const [eventDownloadExcel, setEventDownloadExcel] = useState<IEventos>();
  const [eventUploadExcel, setEventUploadExcel] = useState<IEventos>();
  const [excelFile, setExcelFile] : any = useState();

  const handleInputDowndload = (event:any) => {
    console.log(event.target.value)
    const evento = eventos.find((evento) =>  evento.id === event.target.value)
    setEventDownloadExcel(evento)
  }

  const handleInpuUpload = (event:any) => {
    const evento = eventos.find((evento) =>  evento.id = event.target.value)
    setEventUploadExcel(evento)
  }

  const setExcel = async () => {
    try {
      const token = Cookies.get('token')
      const { data } = await mercadoUrbanoApi.post('/event/setExcelList', excelFile,
      {
        params: {
          id: eventUploadExcel
        },
        headers: { 'Authorization' : `bearer ${token}`,
        'Content-Type': 'multipart/form-data' },
        
      })

      setStatusMessage('OK')
      setSnackMessage('Exito al subir información.')
      setOpen(true);

    } catch (error) {
      setStatusMessage('FAIL')
      setSnackMessage('No se pudo subir la información verifique que tenga evento y archivo seleccionados.')
      setOpen(true)
    }
   
  }

  const downloadExcel = async () => {
    try{
     
      const token = Cookies.get('token')
      const { data } = await mercadoUrbanoApi.post('/event/getExcelList',{
        "fk_evento": eventDownloadExcel?.id
      },
      {
        headers: { 'Authorization' : `bearer ${token}` },
        responseType: 'blob'
      })
      const pdfBlob = new Blob([data], { type: "application/xlsx" })
      return saveAs(pdfBlob, `${eventDownloadExcel?.nombre}.xlsx`);

    }catch(error){

      console.log(error)
    }
  }

  const onFileSelected = ({target}: ChangeEvent<HTMLInputElement>) => {
    if( !target.files || target.files.length === 0)
      return

    try {
      const formData = new FormData()
      formData.append('file', target.files[0])
      setExcelFile(formData)
    } catch (error) {
      
    }
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  
  return (
    <>
      <UserLayout title='Dar de alta usuario' pageDescription='Página usada para dar de alta usuarios nuevos para el programa del Mercado urbano.'>
        <Box minHeight="100vh" >
          <Container maxWidth="lg" style={{ marginTop:"100px" }}>
            <Box>
              <Box>
                <Typography variant="h1" marginTop="50px" color="#707070">
                  Generar listado
                </Typography>
                <Box>
                  <Typography variant="h2" margin="50px 0 10px 0 " color="#707070">
                    Seleccionar evento
                  </Typography>
                  <Box display="flex" justifyContent="center">
                    <Box width="50%" marginRight="50px">
                      <FormControl fullWidth>
                        <InputLabel onChange={handleInputDowndload} id="demo-simple-select-label">Evento</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Zona"
                          onChange={handleInputDowndload}
                        >
                          {
                            eventos?.map((evento) => {
                              return (
                                <MenuItem key={evento.id} value={evento.id}>{evento.nombre}</MenuItem>
                              )
                            })
                          }
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  <Box marginTop="30px" display="flex" justifyContent="center">
                    <Button onClick={() => downloadExcel()} sx={{ padding: "10px 20px" }}  variant="outlined" color="success">Generar listado</Button>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography variant="h1" marginTop="50px" color="#707070">
                  Carga de archivos
                </Typography>
                <Box>
                  <Typography variant="h2" margin="50px 0 10px 0 " color="#707070">
                    Seleccionar evento
                  </Typography>
                  <Box display="flex">
                    <Box width="50%" marginRight="50px">
                      <FormControl fullWidth>
                        <InputLabel onChange={handleInpuUpload} id="demo-simple-select-label">Evento</InputLabel>
                        <Select
                          onChange={handleInpuUpload}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Zona"
                        >
                          {
                            eventos?.map((evento) => {
                              return (
                                <MenuItem key={evento.id} value={evento.id}>{evento.nombre}</MenuItem>
                              )
                            })
                          }
                        </Select>
                      </FormControl>
                    </Box>
                    <Box width="50%" display="flex" alignItems="center">
                      <Input 
                        inputProps={{ accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }}
                        ref={inputRef} 
                        disabled={uploading} 
                        type="file" 
                        className="form-control" 
                        fullWidth
                        onChange={onFileSelected}
                      />
                      {/* <input 
                        type="file"
                        accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        ref={inputRef}
                        onChange ={onFileSelected}
                      /> */}
                    </Box>
                  </Box>
                  <Box marginTop="30px" display="flex" justifyContent="center">
                    <Button onClick={setExcel} sx={{ padding: "10px 20px" }}  variant="outlined" color="success">Subir archivo</Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </UserLayout>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={ statusMessage === "OK" ? "success" : "error" } sx={{ width: '500px' }}>
        {snackMessage}
      </Alert>
      </Snackbar>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {data} = await mercadoUrbanoApi.get<IEventos[]>('/event/getActiveEvents')
  console.log(data)
  return {
    props: {
      eventos: data
    }
  }
}


export default CargaArchivos