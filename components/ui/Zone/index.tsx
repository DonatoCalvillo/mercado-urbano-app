import { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import Button from "@mui/material/Button";

export const Zone = () => {
  const [status, setStatus] = useState("Inscrito")

  const registerZone = () => {
    setStatus("")
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
              A1
            </Typography>
          </Box>
        ) 
      }

      {
        status === "Inscripcion" && (
          <Box  display="flex" alignItems="center" maxWidth="350px" flexDirection="column"> 
            <Typography variant="h6" color="#707070" textAlign="center" marginBottom="20px">
              El registro te toca el jueves 13 de enero a partir de las 03:00 a.m.
            </Typography>
            <Button variant="outlined" style={{ padding: "10px 20px", color: "#707070", borderColor: "#707070" }}>Reservar</Button>
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
                <InputLabel id="demo-simple-select-label">Lugar</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Zona"
                >
                  <MenuItem value={10}>G01</MenuItem>
                  <MenuItem value={20}>G02</MenuItem>
                  <MenuItem value={30}>G03</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Button fullWidth color="success" variant="outlined" style={{ padding: "10px 20px", marginRight: "20px" }}>Confirmar</Button>
              <Button fullWidth color="error" variant="outlined" style={{ padding: "10px 20px" }}>Cancelar</Button>
            </Box>
          </Box>
         )
      }
      
    </>
  )
}
