import React, { useContext } from 'react'
import Image from 'next/image';

import { Box, Container,  Typography } from '@mui/material'

import { UserLayout } from 'components/layouts'
import { InfoProfile, Zone } from 'components/ui'

import Tabasco from '../../../public/icons/Tabasco.png';
import Cardenas from '../../../public/icons/CardenasLogo.png';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { mercadoUrbanoApi } from 'api';
import { AuthContext } from 'context';

const UserDashboard = () => {
  
  return (
    <UserLayout title={'Corredor gastronomico - Home'} pageDescription={'Evento de corredor gastronómico Cárdenas, Tabasco.'}>
      <Box marginTop="100px" height="100vh">
        <Container maxWidth="lg">
          <Typography variant="h1" marginTop="50px" color="#707070">
            Semana Corredor Gastronómico
          </Typography>
          <Typography variant="h2" marginTop="10px" color="#707070">
            H. Cárdenas, Tabasco | Parque indendependencia | 18:00 hrs
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="space-between" marginTop="50px">
            <InfoProfile admin={false}/>
            <Zone />
            <Box>
              <Image src={ Cardenas } alt="puntos" width={150}/>
              <Image src={ Tabasco } alt="puntos" width={150}/>
            </Box>
          </Box>
        </Container>
      </Box>
      </UserLayout> 
  )
}

// export const getServerSideProps: GetServerSideProps = async ({ req }) =>{
//   const { token = '' } = req.headers;
//   console.log(token)
//   const { user, isLoggedIn, logout } = useContext( AuthContext );
//     // const res = await fetch('http://localhost:3001/api/auth/validateToken', options)
//     // console.log(res.json())
//     // const {data} = await await mercadoUrbanoApi.get('/auth/validateToken', {
//     //   headers: { 'Authorization' : `bearer ${token}` }
//     // })
//     // console.log(data)

//   return{
//     props: {

//     }
//   }
// }

export default UserDashboard