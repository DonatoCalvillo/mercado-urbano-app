import { Avatar, Box, Button, Chip, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { AuthLayout } from 'components/layouts/AuthLayout';
import { ErrorOutline } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/auth/AuthContext';
import { useRouter } from 'next/router';

type FormData = {
  matricula: string;
  contrasenia: string;
}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'H. Ayuntamiento de Cárdenas, Tabasco 2021 - 2024 - Derechos Reservados'}
    </Typography>
  );
}

export const AuthUser = () => {

  const router = useRouter()

  const { login } = useContext( AuthContext )

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const [showError, setShowError] = useState(false)
  const [blockButton, setBlockButton] = useState(false)

  const onLoginuser = async ( {matricula, contrasenia}: FormData ) => {
    
    setShowError(false)

    const isValidLogin = await login(matricula, contrasenia)

    if( !isValidLogin ){
      setShowError(true)
      setTimeout(()=> {
        setShowError(false)
      }, 5000)
      return
    }

    router.replace('/')
    
  }

  return (
    <AuthLayout title={'Inicio de sesión'} pageDescription={'Página para iniciar sesion para el proyecto de mercados de progreso y bienestar.'}>
      <Box flexDirection="column" width="100%" height="100vh" display="flex" alignItems="center" justifyContent="center" style={{ background: '#9D2449' }}>
        <form onSubmit={ handleSubmit(onLoginuser) } noValidate style={{ background: "#ffffff", borderRadius: "10px", padding: "20px" }}>
          <Box sx={{ width: 350, padding: '10px 20px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='h1' component="h1">Iniciar sesión</Typography>
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
                  label="Matricula" 
                  variant='filled' 
                  fullWidth 
                  { ...register('matricula', { 
                    required: 'Este campo es requerido.' 
                  })} 
                  error = { !!errors.matricula } 
                  helperText = { errors.matricula?.message } 
                />
              </Grid>

              <Grid item xs={12}>
                <TextField 
                label="Contraseña" 
                type="password" 
                variant='filled' 
                fullWidth
                { ...register('contrasenia',{
                  required: 'Este campo es requerido.',
                  minLength: { value: 6, message: 'Minimo 6 caracteres.' }
                })}
                error = { !!errors.contrasenia }
                helperText = { errors.contrasenia?.message } 
              />
              </Grid>

              <Grid item xs={12}>
                {
                  blockButton ? 
                  (
                    <Button type='submit' color='secondary' size='large' fullWidth disabled>
                      Ingresar
                    </Button>
                  )
                  : (
                    <Button type='submit' color='secondary' size='large' fullWidth>
                      Ingresar
                    </Button>
                  )
                }
                
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
      
      
      {/* <div>

      <form onSubmit={ handleSubmit( onLoginuser ) }>
        <Box flexDirection="column" width="100%" height="100vh" display="flex" alignItems="center" justifyContent="center" style={{ background: '#9D2449' }}>
        <Container component="main" maxWidth="xs" style={{ background: "#FFFFFf", borderRadius: "10px", boxShadow: "10px 10px 26px 0px rgba(0,0,0,0.75)"  }}>
          <CssBaseline /> 
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Inicia Sesión
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="matricula"
                label="Matricula"
                name="matricula"
                autoComplete="matricula"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="contraseia"
                label="Contraseña"
                type="contraseia"
                id="contraseia"
                autoComplete="contraseia"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ background: "#C8C8C8", padding: "10px" }}
              >
                Iniciar sesión
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </Box>
      </form>
      </div> */}
    </AuthLayout>
  )
}
