import React, { useContext } from 'react'
import Image from 'next/image';

import { Box, Container,  Typography } from '@mui/material'

import { UserLayout } from 'components/layouts'
import { InfoProfile, Zone } from 'components/ui'

import Cardenas from '../../../public/icons/CardenasLogo.png';
import MercadoUrbano from '../../../public/icons/MercadoUrbano.png';
import { GetServerSideProps, NextPage } from 'next';
import { mercadoUrbanoApi } from 'api';
import { IEvento } from 'interfaces/IEvento';

interface Props {
  evento: IEvento;
}

const UserDashboard: NextPage<Props> = ({evento}) => {
  
  return (
    <UserLayout title={'Corredor gastronomico - Home'} pageDescription={'Evento de corredor gastronómico Cárdenas, Tabasco.'}>
      <Box marginTop="100px" height="100vh">
        <Container maxWidth="lg">
          <Typography variant="h1" marginTop="50px" color="#707070">
            {`${evento.evento_nombre} ${evento.evento_semana}`}
          </Typography>
          <Typography variant="h2" marginTop="10px" color="#707070">
            H. Cárdenas, Tabasco | {evento.plaza_nombre} | {evento.evento_hora} hrs
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="space-between" marginTop="50px">
            <InfoProfile admin={false}/>
            <Zone numeroLugar={evento.lugar_numero}  inscrito={evento.usuario_evento_inscrito} fechaInscripcion={evento.usuario_evento_fechaInscripcion} />
            <Box>
              <Image src={ Cardenas } alt="puntos" width={150}/>
              <Image src={ MercadoUrbano } alt="puntos" width={200}/>
            </Box>
          </Box>
        </Container>
      </Box>
      </UserLayout> 
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token = '' } =  req.cookies
  console.log(token)
  const { data } = await mercadoUrbanoApi.get<IEvento>('/event/eventList',{
    headers: { 'Authorization' : `bearer ${token}` }
  })
  console.log(data)
  return{
    props:{
      evento: data
    }
  }
}

export default UserDashboard