import * as React from 'react';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { IUsuarioListado } from 'interfaces';
import { FC, useState } from 'react';
import { Avatar, Box, Button, Modal, Typography } from '@mui/material';
import {makeStyles} from '@mui/styles'
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';

import HistoryUser from '../HistoryUser';
import Image from 'next/image';


import Difuminar from '../../../public/icons/difuminar.png';

const columns: GridColDef[] = [
  { field: 'matricula', headerName: 'Matricula', width: 200 },
  { field: 'apellido_paterno', headerName: 'Apellido Paterno', width: 200 },
  { field: 'apellido_materno', headerName: 'Apellido Materno', width: 200 },
  { field: 'nombre', headerName: 'Nombre', width: 200 },
  { field: 'puntos', headerName: 'Puntos', width: 200 },
];

const useStyles:any = makeStyles(() => ({
  root: {
    "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
      display: "none"
    }
  }
}));

interface Props {
  handleSelectedUser: (estado:boolean) => void;
  usuarios: IUsuarioListado[];
}

export const ListUsers:FC<Props> = ({ usuarios }) => {
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUsuarioListado>();
  
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <>
      <Box display="flex" justifyContent="center" flexDirection="column" width="100%">
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            className={classes.root}
            rows={usuarios.map((usuario, index) => { return {id: usuario.matricula, ...usuario} })}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            selectionModel={selectionModel}
            hideFooterSelectedRowCount
            onSelectionModelChange={(selection) => {
              console.log(selection)
              if (selection.length > 1) {
                const selectionSet = new Set(selectionModel);
                const result = selection.filter((s) => !selectionSet.has(s));
                setSelectionModel(result);
              } else {
                setSelectionModel(selection);
              }
            }}
          />
        </div>
        <Box display="flex" justifyContent="right">
          <Button style={{
            width: "150px",
            marginTop:"50px",
            padding: "10px"
          }}
            variant="outlined" color='success' 
            // onClick={handleOpen}
            onClick={() => {
              const _selectedUser = usuarios.find( usuario => usuario.matricula === selectionModel.toString())
              setSelectedUser(_selectedUser)
              handleOpen()
            }}
          >
            Ver detalle  
          </Button>
        </Box>
      </Box>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="nuevo-usuario"
        aria-describedby="modal-modal-description"
      >
        <Box 
          position="absolute" 
          top="50%" left="50%" 
          width="1500px"
          style={{ transform: "translate(-50%, -50%)",
          boxShadow: "24",
          background: "#ffffff",
          padding: "50px" }}>
          <Box display="flex" alignItems="center" width="100%">
        <Avatar alt='Nombre del usaurio' src='' style={{ width: "100px", height: "100px" }}/>
        <Box marginLeft="20px" width="100%">
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography fontSize="22px" variant="h2" marginTop="10px" color="#707070">
              {`${selectedUser?.apellido_paterno} ${selectedUser?.apellido_materno} ${selectedUser?.nombre}`}
            </Typography>
            <Box onClick={() => handleClose()}>
              <DoNotDisturbOnIcon style={{ color: "#F89832", cursor: "pointer" }}/>
            </Box>
          </Box>
          <Typography fontWeight="600" fontStyle="italic" fontSize="18px" variant="h2" marginTop="10px" color="#707070">
            #{selectedUser?.matricula}
          </Typography>
          <Box display="flex" alignItems="center">
            <Image src={ Difuminar } alt="puntos" width={30}/>
            <Typography variant="h6" fontSize="20px" fontWeight="100" marginLeft="5px" color="#707070">
              {selectedUser?.puntos} puntos
            </Typography>
          </Box>
          <Box display="flex" width="100%" justifyContent="space-between">
            <Typography fontWeight="100" fontSize="16px" variant="h3" marginTop="10px" color="#707070">
              {selectedUser?.correo}
            </Typography>
            <Typography fontWeight="100" fontSize="16px" variant="h3" marginTop="10px" color="#707070">
              {selectedUser?.telefono}
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
          {/* <Box marginTop="20px" display="flex" justifyContent="space-between">
            <Button style={{ marginRight: "10px" }} onClick={handleClose} color='success' variant="outlined" type='submit' size='large' fullWidth>
              IMPRIMIR
            </Button>
            <Button onClick={handleClose} color='error' variant="outlined" type='submit' size='large' fullWidth>
              CERRAR
            </Button>
          </Box> */}
        </Box>
      </Modal>
    </>
  );
}