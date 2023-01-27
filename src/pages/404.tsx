import { Box, Button, Container, Typography } from '@mui/material';
import { UserLayout } from '../../components/layouts/UserLayout';
import Image from 'next/image';
import Image404 from '../../public/icons/Image404.svg'


const Custom404 = () => {
  return (
    <UserLayout title='Página no encontrada' pageDescription='No se encontro lo que estabas buscando,'>
        <Container sx={{display: 'flex'}} >
          <Box width="100%" height="90vh" display="flex" alignItems="center" justifyContent="center"> 
              <Image src={ Image404 } alt="puntos" width={200} style={{ marginRight: "50px" }}/>
              <Box maxWidth="300px">

                <Typography variant='h2' component="h2" fontSize="60px" fontWeight="600">404</Typography>
                <Typography variant='h3' component="h3" fontSize="22px" fontWeight="100" margin="20px 0">Ups... parece que lo que buscas ya no se encuentra aqui...</Typography>
                <Button variant="outlined" style={{ padding:"10px 20px", fontSize: "16px" }}>Regresar al inicio</Button>
              
              </Box>
          </Box>
        </Container>
    </UserLayout>
  )
}

export default Custom404