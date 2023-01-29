import React, { useState } from 'react'
import { UserLayout } from 'components/layouts';
import { Box, Button, Chip, Container, Grid, Modal, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ErrorOutline } from '@mui/icons-material';
import Image from 'next/image';

import SignIn from '../../../../public/icons/signin.svg';

type FormData = {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo: string;
  telefono: string;
}

const AltaUsuarios = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const [showError, setShowError] = useState(false)
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onLoginuser = async (  ) => {

  }

  return (
    <UserLayout title='Dar de alta usuario' pageDescription='Página usada para dar de alta usuarios nuevos para el programa del Mercado urbano.'>
      <Box minHeight="100vh" display="flex" alignItems="center">
        <Container maxWidth="lg">
          <Typography variant="h1" marginTop="50px" color="#707070">
            Dar de alta
          </Typography>
          <Box display="flex" alignItems="center">
            <Box width="40%">
              <form onSubmit={ handleSubmit(onLoginuser) } noValidate style={{ background: "#ffffff", borderRadius: "10px", padding: "20px" }}>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography fontSize="16px" variant='h3' component="h3">Usuario</Typography>
                      <Chip
                        label="Credenciales incorrectas"
                        color="error"
                        icon= { <ErrorOutline/> }
                        className="fadein"
                        sx={{ display: showError ? 'flex':'none' }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField 
                        label="Nombre*" 
                        variant='filled' 
                        fullWidth 
                        { ...register('nombre', { 
                          required: 'Este campo es requerido.' 
                        })} 
                        error = { !!errors.nombre } 
                        helperText = { errors.nombre?.message } 
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField 
                      label="Apellido paterno*" 
                      variant='filled' 
                      fullWidth
                      { ...register('apellido_paterno',{
                        required: 'Este campo es requerido.',
                        minLength: { value: 6, message: 'Minimo 6 caracteres.' }
                      })}
                      error = { !!errors.apellido_paterno }
                      helperText = { errors.apellido_paterno?.message } 
                    />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField 
                      label="Apellido materno*" 
                      variant='filled' 
                      fullWidth
                      { ...register('apellido_materno',{
                        required: 'Este campo es requerido.',
                        minLength: { value: 6, message: 'Minimo 6 caracteres.' }
                      })}
                      error = { !!errors.apellido_materno }
                      helperText = { errors.apellido_materno?.message } 
                    />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField 
                      label="Correo" 
                      type="email" 

                      variant='filled' 
                      fullWidth
                      { ...register('correo',{
                      })}
                      error = { !!errors.correo }
                      helperText = { errors.correo?.message } 
                    />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField 
                      label="Telefono" 
                      variant='filled' 
                      fullWidth
                      { ...register('telefono',{
                      })}
                      error = { !!errors.telefono }
                      helperText = { errors.telefono?.message } 
                    />
                    </Grid>

                    <Grid item xs={12}>
                      <Button onClick={handleOpen} color='success' variant="outlined" type='submit' size='large' fullWidth>
                        Registrar
                      </Button>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="nuevo-usuario"
                        aria-describedby="modal-modal-description"
                      >
                        <Box 
                          position="absolute" 
                          top="50%" left="50%" 
                          width="500px"
                          style={{ transform: "translate(-50%, -50%)",
                          boxShadow: "24",
                          background: "#ffffff",
                          padding: "50px" }}>
                          <Typography  id="modal-modal-title" variant="h6" component="h2">
                            Usuario generado
                          </Typography>
                          <Box display="flex" justifyContent="space-between">
                            <Typography marginRight="10px" fontWeight="500" id="modal-modal-description" sx={{ mt: 2 }}>
                              Nombre:
                            </Typography>
                            <Typography fontWeight="100" id="modal-modal-description" sx={{ mt: 2 }}>
                              Edgar Donato Calvillo Lumbreras
                            </Typography>
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Typography marginRight="10px" fontWeight="500" id="modal-modal-description" sx={{ mt: 2 }}>
                              Matricula:
                            </Typography>
                            <Typography fontWeight="100" id="modal-modal-description" sx={{ mt: 2 }}>
                            CAR001-C
                            </Typography>
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Typography marginRight="10px" fontWeight="500" id="modal-modal-description" sx={{ mt: 2 }}>
                              Contraseña:
                            </Typography>
                            <Typography fontWeight="100" id="modal-modal-description" sx={{ mt: 2 }}>
                              sdf12s5dfis4co1
                            </Typography>
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Typography marginRight="10px" fontWeight="500" id="modal-modal-description" sx={{ mt: 2 }}>
                              Correo:
                            </Typography>
                            <Typography fontWeight="100" id="modal-modal-description" sx={{ mt: 2 }}>
                              edgar_donato@outlook.com
                            </Typography>
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Typography marginRight="10px" fontWeight="500" id="modal-modal-description" sx={{ mt: 2 }}>
                              Telefono:
                            </Typography>
                            <Typography fontWeight="100" id="modal-modal-description" sx={{ mt: 2 }}>
                              9371194962
                            </Typography>
                          </Box>
                        </Box>
                      </Modal>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </Box>
            <Box width="60%" display="flex" alignItems="center" justifyContent="center">
              <Image src={ SignIn } alt="puntos" width={500}/>
            </Box>
          </Box>
        </Container>
      </Box>
    </UserLayout>
  )
}

export default AltaUsuarios