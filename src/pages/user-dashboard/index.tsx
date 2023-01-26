import React from 'react'
import Image from 'next/image';

import { Box, Container,  Typography } from '@mui/material'

import { UserLayout } from 'components/layouts'
import { InfoProfile, Zone } from 'components/ui'

import Tabasco from '../../../public/icons/Tabasco.png';
import Cardenas from '../../../public/icons/CardenasLogo.png';

const index = () => {
  return (
    <UserLayout title={'Corredor gastronomico - Home'} pageDescription={'Evento de corredor gastronómico Cárdenas, Tabasco.'}>
        <Container maxWidth="lg">
          <Typography variant="h1" marginTop="50px" color="#707070">
            Semana Corredor Gastronómico
          </Typography>
          <Typography variant="h2" marginTop="10px" color="#707070">
            H. Cárdenas, Tabasco | Parque indendependencia | 18:00 hrs
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="space-between" marginTop="50px">
            <InfoProfile/>
            <Zone />
            <Box>
              <Image src={ Cardenas } alt="puntos" width={150}/>
              <Image src={ Tabasco } alt="puntos" width={150}/>
            </Box>
          </Box>
        </Container>
      </UserLayout> 
  )
}
 export default index