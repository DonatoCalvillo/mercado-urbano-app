import React from 'react'
import Image from 'next/image';

import { Box, Container, Typography } from '@mui/material';
import { UserLayout } from 'components/layouts';
import { InfoProfile } from 'components/ui';

import MercadoUrbano from '../../../public/icons/MercadoUrbano.png';
import Cardenas from '../../../public/icons/CardenasLogo.png';

import { AdminDashboardTable } from 'components/ui/AdminDashboardTable';
import { useState } from 'react';

const AdminDashboard = () => {
  const [selectedUser, setSelectedUser] = useState(false)

  return (
    <UserLayout title='Dashboard Administrador' pageDescription='Este es el dashboard para los administradores'>
      <Box minHeight="100vh" display="flex" alignItems="center">
      <Container maxWidth="lg">
        <Typography variant="h1" marginTop="50px" color="#707070">
          Panel administrativo
        </Typography>
        <Typography variant="h2" marginTop="10px" color="#707070">
          H. Cárdenas, Tabasco
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between" marginTop="50px">
          <InfoProfile admin={true}/>
          <Box>
            <Image src={ Cardenas } alt="puntos" width={150}/>
            <Image src={ MercadoUrbano } alt="puntos" width={200}/>
          </Box>
        </Box>
        <Box marginTop="50px" width="100%">
          <Box display="flex" marginBottom="20px">
            <Typography margin="auto" variant="h2" color="#707070">
              Puntuaciones
            </Typography>
          </Box>
          <AdminDashboardTable selectedUser={selectedUser}/>
        </Box>
      </Container>
      </Box>
    </UserLayout>
  )
}

export default AdminDashboard