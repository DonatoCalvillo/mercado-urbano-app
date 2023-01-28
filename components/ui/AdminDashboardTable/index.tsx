import { Avatar, Box, Button, Typography } from '@mui/material'
import Image from 'next/image';

import React, { FC } from 'react'
import ListUsers from '../ListUsers'

import Difuminar from '../../../public/icons/difuminar.png';
import HistoryUser from '../HistoryUser';

interface Props {
  selectedUser: boolean
}

export const AdminDashboardTable: FC<Props>= ({ selectedUser }) => {
  console.log(selectedUser)
  return (
    <Box display="flex">
    <ListUsers/>
    {
      selectedUser ?
      (<Box marginLeft="50px" width="100%">
      <Box display="flex" alignItems="center" width="100%">
        <Avatar alt='Nombre del usaurio' src='' style={{ width: "100px", height: "100px" }}/>
        <Box marginLeft="20px" width="100%">
          <Typography fontSize="22px" variant="h2" marginTop="10px" color="#707070">
            Edgar Donato Calvillo Lumbreras
          </Typography>
          <Typography fontWeight="600" fontStyle="italic" fontSize="18px" variant="h2" marginTop="10px" color="#707070">
            #CAR004-G	
          </Typography>
          <Box display="flex" alignItems="center">
            <Image src={ Difuminar } alt="puntos" width={30}/>
            <Typography variant="h6" fontSize="20px" fontWeight="100" marginLeft="5px" color="#707070">
              1860 puntos
            </Typography>
          </Box>
          <Box display="flex" width="100%" justifyContent="space-between">
            <Typography fontWeight="100" fontSize="16px" variant="h3" marginTop="10px" color="#707070">
              edgar_donato@outlook.com
            </Typography>
            <Typography fontWeight="100" fontSize="16px" variant="h3" marginTop="10px" color="#707070">
              937 119 49 62
            </Typography>
          </Box>
          </Box>
        </Box>
        <Box display="flex" justifyContent="right" marginTop="20px">
          <Button color='error' variant="outlined" style={{ }}>
            Eliminar
          </Button>
        </Box>
        <HistoryUser/>
    </Box>) 
      :
      (<Box width="100%" display="flex" alignItems="center" justifyContent="center">
        <Typography fontWeight="100" fontSize="16px" variant="h3" marginTop="10px" color="#707070">
        Seleccione un usuario para ver su información
            </Typography>
      </Box>)
    }
    
  </Box>
  )
}
