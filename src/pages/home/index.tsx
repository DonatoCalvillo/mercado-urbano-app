import { Box, Container, Typography } from '@mui/material'
import { UserLayout } from 'components/layouts'
import React from 'react'
import Image from 'next/image';

import MU1 from '../../../public/images/MU-1.jpg'
import MU2 from '../../../public/images/MU-2.jpg'
import MU3 from '../../../public/images/MU-3.jpg'
import MU4 from '../../../public/images/MU-4.jpg'
import MU5 from '../../../public/images/MU-5.jpg'

const Home = () => {
  return (
    <UserLayout title='Inicio' pageDescription='Página de inicio para el programa del Mercado urbano.'>
      <Box marginTop="50px" minHeight="100vh" display="flex" alignItems="center">
        <Container  maxWidth="lg">
          <Typography variant="h1" marginBottom="50px" color="#707070">
            Iniciativa: Mercado de progreso y bienestar
          </Typography>
          <Box
            sx={{
              maxWidth: '100%',
              maxHeight: '540px'
            }}
          >
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 1,
                gridTemplateRows: 'repeat(2, 1fr)',
                gridTemplateAreas: `"image1 image1 image2 image3"
                                    "image1 image1 image4 image5"`,
              }}
            >
              <Box sx={{ gridArea: 'image1' }}>
                <Image src={ MU1 } alt="puntos" style={{ width: "100%", height: "100%" }}/>
              </Box>
              <Box sx={{ gridArea: 'image2' }}>
                <Image src={ MU2 } alt="puntos" style={{ width: "100%", height: "100%" }}/> 
              </Box>
              <Box sx={{ gridArea: 'image3' }}>
                <Image src={ MU3 } alt="puntos" style={{ width: "100%", height: "100%" }}/> 
              </Box>
              <Box sx={{ gridArea: 'image4' }}>
                <Image src={ MU4 } alt="puntos" style={{ width: "100%", height: "100%" }}/> 
              </Box>
              <Box sx={{ gridArea: 'image5' }}>
                <Image src={ MU5 } alt="puntos" style={{ width: "100%", height: "100%" }}/> 
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography textAlign="center" fontSize="16px" variant="h3" marginTop="50px" color="#707070">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto praesentium cum, rerum, corporis quibusdam et odit nihil temporibus, reiciendis ad porro unde doloribus sit modi illo veritatis dicta doloremque beatae non quos? Assumenda aliquam repellendus alias quisquam nam in dicta fugiat voluptates impedit exercitationem ipsam repellat soluta autem non numquam veritatis explicabo, excepturi accusamus sequi beatae ipsum labore dolorum laboriosam. Temporibus, dolorum commodi. Repellendus, veniam dolorum ex dicta eligendi earum, nisi at neque fuga odio sint dignissimos, esse pariatur consequuntur molestias accusamus omnis asperiores quia saepe exercitationem optio? Facilis eum quo beatae quis fugit saepe dignissimos sit quam earum nobis aperiam inventore corrupti dicta aliquam nemo tempora, natus sint enim, vitae rem architecto obcaecati quas. Pariatur at et perferendis harum non ratione, neque quisquam? Adipisci in enim doloribus harum soluta sed quos expedita iure, blanditiis repellendus veniam itaque ad explicabo amet eos quod esse. Odio temporibus sed doloremque, fugit adipisci molestias pariatur ducimus unde laborum architecto nesciunt itaque provident sapiente eum labore nostrum! Ducimus eius error ullam reiciendis doloremque mollitia illo perspiciatis nulla sed ipsam voluptates non eos quod vitae, laudantium consequuntur earum vero dignissimos omnis laboriosam saepe explicabo. Corporis fuga fugit at omnis neque error, rerum unde deleniti quibusdam placeat ex. Veritatis ullam nobis quas impedit magni, aut architecto sapiente. Rem deserunt excepturi impedit porro officiis architecto maxime tenetur vel neque earum blanditiis quisquam eius, ut ratione nisi esse sint cumque nam aspernatur ad eos. Nemo expedita nisi voluptate neque? Mollitia, est? Numquam, sed! Error eligendi placeat molestiae rerum?
            </Typography>
          </Box>
        </Container>
      </Box>
    </UserLayout>
  )
}

export default Home