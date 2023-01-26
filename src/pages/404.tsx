import { Box, Container } from '@mui/material';
import { UserLayout } from '../../components/layouts/UserLayout';
import Image from 'next/image';
import Image404 from '../../public/icons/Image404.svg'


const Custom404 = () => {
  return (
    <UserLayout title='Página no encontrada' pageDescription='No se encontro lo que estabas buscando,'>
        <Container sx={{display: 'flex'}} style={{ background: "black" }}>
          <Box width="100%" height="100%" style={{ background: "red" }} display="flex" alignItems="center" justifyContent="center"> 
              <Image src={ Image404 } alt="puntos" width={200}/>
              <h1>404</h1>
          </Box>
        </Container>
    </UserLayout>
  )
}

export default Custom404