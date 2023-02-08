import { Avatar, Box, Button, Typography } from '@mui/material'
import Image from 'next/image';

import React, { FC } from 'react'
import {ListUsers} from '../ListUsers'

import Difuminar from '../../../public/icons/difuminar.png';
import HistoryUser from '../HistoryUser';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import { useEffect, useState } from 'react';
import { mercadoUrbanoApi } from 'api';
import { IUsuarioListado } from '../../../interfaces/IUsuario';

interface Props {
  selectedUser: boolean;
  usuarios: IUsuarioListado[];
  handleSelectedUser: (estado:boolean) => void;
}

export const AdminDashboardTable: FC<Props>= ({ usuarios, selectedUser, handleSelectedUser }) => {
  console.log(usuarios)
  return (
    <Box display="flex">
    <ListUsers usuarios={usuarios} handleSelectedUser={handleSelectedUser}/>
    {/* {
      selectedUser ?
      (<Box marginLeft="50px" width="100%">
      <Box display="flex" alignItems="center" width="100%">
        <Avatar alt='Nombre del usaurio' src='' style={{ width: "100px", height: "100px" }}/>
        <Box marginLeft="20px" width="100%">
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography fontSize="22px" variant="h2" marginTop="10px" color="#707070">
              Edgar Donato Calvillo Lumbreras
            </Typography>
            <Box onClick={() => handleSelectedUser(false)}>
              <DoNotDisturbOnIcon style={{ color: "#F89832", cursor: "pointer" }}/>
            </Box>
          </Box>
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
    } */}
    
  </Box>
  )
}
