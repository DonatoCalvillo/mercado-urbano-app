import { Box, Button, Container, Input, Select, Typography, MenuItem, InputLabel, FormControl } from '@mui/material';
import { UserLayout } from 'components/layouts'
import React, { useRef } from 'react'
import { useState } from 'react';

const CargaArchivos = () => {
   const  handleInput = async (e:any) =>{
  }

  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUploadCSV = () => {
    setUploading(true);

    const input:any = inputRef?.current;
    const reader = new FileReader();
    const [file] = input.files;

    reader.readAsText(file);
  };
  
  return (
    <UserLayout title='Dar de alta usuario' pageDescription='Página usada para dar de alta usuarios nuevos para el programa del Mercado urbano.'>
      <Box minHeight="100vh" >
        <Container maxWidth="lg" style={{ marginTop:"100px" }}>
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
                  <InputLabel id="demo-simple-select-label">Evento</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Zona"
                  >
                    <MenuItem value={10}>Corredor gastronomico Semana 1</MenuItem>
                    <MenuItem value={20}>Corredor gastronomico Semana 2</MenuItem>
                    <MenuItem value={30}>Corredor gastronomico Semana 3</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box width="50%" display="flex" alignItems="center">
                <Input 
                  inputProps={{ accept: ".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }}
                  ref={inputRef} 
                  disabled={uploading} 
                  type="file" 
                  className="form-control" 
                  fullWidth
                />
              </Box>
            </Box>
            <Box marginTop="30px" display="flex" justifyContent="center">
              <Button sx={{ padding: "10px 20px" }}  variant="outlined" color="success">Subir archivo</Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </UserLayout>
  )
}

export default CargaArchivos