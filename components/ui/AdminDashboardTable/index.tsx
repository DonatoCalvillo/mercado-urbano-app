import { Box } from '@mui/material'

import React, { FC } from 'react'
import {ListUsers} from '../ListUsers'
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
  </Box>
  )
}
