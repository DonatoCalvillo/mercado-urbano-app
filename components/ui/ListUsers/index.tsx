import * as React from "react";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { IUsuarioListado } from "interfaces";
import { FC, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Input,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";

import { HistoryUser } from "../HistoryUser";
import Image from "next/image";

import mercadoUrbanoApi from "../../../api/mercadoUrbanoApi";
import Cookies from "js-cookie";
import { IUserHistory } from "../../../interfaces/IUsuario";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const columns: GridColDef[] = [
  { field: "matricula", headerName: "Matricula", width: 200 },
  { field: "apellido_paterno", headerName: "Apellido Paterno", width: 200 },
  { field: "apellido_materno", headerName: "Apellido Materno", width: 200 },
  { field: "nombre", headerName: "Nombre", width: 200 },
  { field: "puntos", headerName: "Puntos", width: 200 },
];

const useStyles: any = makeStyles(() => ({
  root: {
    "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
      {
        display: "none",
      },
  },
}));

interface Props {
  handleSelectedUser: (estado: boolean) => void;
  usuarios: IUsuarioListado[];
}

export const ListUsers: FC<Props> = ({}) => {
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUsuarioListado>();
  const [userHistory, setUserHistory] = useState<IUserHistory[]>([]);
  const [usuarios, setUsuarios] = useState<IUsuarioListado[]>([]);
  const [sureDelete, setSureDelete] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getAllUsers = async () => {
      const token = Cookies.get("token");
      const { data } = await mercadoUrbanoApi.get("/user/getAll?limit=100", {
        headers: { Authorization: `bearer ${token}` },
      });
      console.log(data);
      setUsuarios(data.data);
    };

    getAllUsers();
  }, []);

  const historyOnClick = async () => {
    const _selectedUser = usuarios.find(
      (usuario) => usuario.id === selectionModel.toString()
    );
    console.log(usuarios);
    if (!_selectedUser) return;

    setSelectedUser(_selectedUser);
    handleOpen();

    try {
      const token = Cookies.get("token");
      const { data } = await mercadoUrbanoApi.post(
        "/event/getEventHistory",
        {
          matricula: _selectedUser?.matricula,
        },
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      setUserHistory(data.historyFinal);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async () => {
    try {
      const _selectedUser = usuarios.find(
        (usuario) => usuario.matricula === selectionModel.toString()
      );

      if (!_selectedUser) return;

      const token = Cookies.get("token");
      const { data } = await mercadoUrbanoApi.delete("/user/deleteUser", {
        headers: { Authorization: `bearer ${token}` },
        params: {
          id: _selectedUser?.matricula,
        },
      });

      if (data.status == "OK") setUsuarios(data.data);

      handleClose();
    } catch (error) {}
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        width="100%"
      >
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            className={classes.root}
            rows={usuarios.map((usuario, index) => {
              return { ...usuario };
            })}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            selectionModel={selectionModel}
            hideFooterSelectedRowCount
            onSelectionModelChange={(selection) => {
              console.log(selection);
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
          <Button
            style={{
              width: "150px",
              marginTop: "50px",
              padding: "10px",
            }}
            variant="outlined"
            color="success"
            // onClick={handleOpen}
            onClick={historyOnClick}
            // disabled={selectedUser ? false : true}
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
          top="50%"
          left="50%"
          width="1500px"
          sx={{
            width: {
              lg: "1000px",
              md: "800px",
              sm: "500px",
              xs: "100%",
            },
          }}
          style={{
            transform: "translate(-50%, -50%)",
            boxShadow: "24",
            background: "#ffffff",
            padding: "50px",
          }}
        >
          <Box display="flex" alignItems="center" width="100%">
            <Avatar
              sx={{
                display: {
                  lg: "flex",
                  md: "flex",
                  sm: "flex",
                  xs: "none",
                },
              }}
              alt="Nombre del usaurio"
              src=""
              style={{ width: "100px", height: "100px" }}
            />
            <Box marginLeft="20px" width="100%">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                {isEditing ? (
                  <>
                    <TextField
                      label="Apellido paterno"
                      defaultValue={
                        selectedUser?.apellido_paterno
                          ? selectedUser?.apellido_paterno
                          : "N/E"
                      }
                      variant="outlined"
                    />
                    <TextField
                      label="Apellido materno"
                      defaultValue={
                        selectedUser?.apellido_materno
                          ? selectedUser?.apellido_materno
                          : "N/E"
                      }
                      variant="outlined"
                    />
                    <TextField
                      label="Nombre"
                      defaultValue={
                        selectedUser?.nombre ? selectedUser?.nombre : "N/E"
                      }
                      variant="outlined"
                    />
                  </>
                ) : (
                  <Typography
                    fontSize="22px"
                    variant="h2"
                    marginTop="10px"
                    color="#707070"
                  >
                    {`${selectedUser?.apellido_paterno} ${selectedUser?.apellido_materno} ${selectedUser?.nombre}`}
                  </Typography>
                )}

                <Box onClick={() => handleClose()}>
                  <CloseIcon style={{ color: "red", cursor: "pointer" }} />
                </Box>
              </Box>
              <Typography
                fontWeight="600"
                fontStyle="italic"
                fontSize="18px"
                variant="h2"
                marginTop="10px"
                color="#707070"
              >
                #{selectedUser?.matricula}
              </Typography>
              <Box display="flex" alignItems="center">
                <Image
                  src="https://res.cloudinary.com/djtf4beq7/image/upload/v1684083984/difuminar_i7fuft.png"
                  alt="puntos"
                  width={30}
                  height={30}
                />
                <Typography
                  variant="h6"
                  fontSize="20px"
                  fontWeight="100"
                  margin="10px 0"
                  color="#707070"
                >
                  {selectedUser?.puntos} puntos
                </Typography>
              </Box>
              <Grid
                container
                display="flex"
                width="100%"
                justifyContent="space-between"
              >
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  {isEditing ? (
                    <TextField
                      label="Correo"
                      defaultValue={
                        selectedUser?.correo ? selectedUser?.correo : "N/E"
                      }
                      variant="outlined"
                    />
                  ) : (
                    <Typography
                      fontWeight="100"
                      fontSize="16px"
                      variant="h3"
                      marginTop="10px"
                      color="#707070"
                    >
                      {selectedUser?.correo ? selectedUser?.correo : "N/E"}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  {isEditing ? (
                    <TextField
                      label="Telefono"
                      defaultValue={
                        selectedUser?.telefono ? selectedUser?.telefono : "N/E"
                      }
                      variant="outlined"
                    />
                  ) : (
                    <Typography
                      fontWeight="100"
                      fontSize="16px"
                      variant="h3"
                      marginTop="10px"
                      color="#707070"
                    >
                      {selectedUser?.telefono ? selectedUser?.telefono : "N/E"}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box display="flex" justifyContent="right" marginTop="20px">
            {isEditing ? (
              <>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  color="success"
                  variant="outlined"
                  style={{
                    margin: "10px 10px",
                  }}
                >
                  <CheckCircleIcon style={{ marginRight: "5px" }} /> Aceptar
                </Button>
                <Button
                  onClick={() => setSureDelete(true)}
                  color="error"
                  variant="outlined"
                  style={{
                    margin: "10px 0", 
                  }}
                >
                  <CancelIcon style={{ marginRight: "5px" }} /> Cancelar
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  color="info"
                  variant="outlined"
                  style={{
                    margin: "10px 10px",
                  }}
                >
                  <EditIcon style={{ marginRight: "5px" }} /> Editar
                </Button>
                <Button
                  onClick={() => setSureDelete(true)}
                  color="error"
                  variant="outlined"
                  style={{
                    margin: "10px 0",
                  }}
                >
                  <DeleteIcon style={{ marginRight: "5px" }} /> Eliminar
                </Button>
              </>
            )}
          </Box>
          <HistoryUser userHistory={userHistory} />
        </Box>
      </Modal>

      <Modal
        open={sureDelete}
        // onClose={handleClose}
        aria-labelledby="nuevo-usuario"
        aria-describedby="modal-modal-description"
      >
        <Box
          position="absolute"
          display="flex"
          justifyContent="center"
          flexDirection="column"
          top="50%"
          left="50%"
          width="1500px"
          sx={{
            width: {
              lg: "500px",
              md: "500px",
              sm: "500px",
              xs: "100%",
            },
          }}
          style={{
            transform: "translate(-50%, -50%)",
            boxShadow: "24",
            background: "#ffffff",
            padding: "50px",
          }}
        >
          <Box
            onClick={() => setSureDelete(false)}
            display="flex"
            justifyContent="right"
          >
            <CloseIcon
              style={{
                color: "red",
              }}
            />
          </Box>

          <Typography
            fontWeight="800"
            fontSize="16px"
            variant="h3"
            marginTop="10px"
            color="#707070"
            textAlign="center"
            marginBottom="10px"
          >
            ¿Estas seguro de borrar el usuario seleccionado?
          </Typography>
          <Stack
            display="flex"
            justifyContent="center"
            direction="row"
            spacing={2}
          >
            <Button
              onClick={() => setSureDelete(false)}
              variant="outlined"
              color="error"
            >
              CANCELAR
            </Button>
            <Button onClick={deleteUser} variant="outlined" color="success">
              CONFIRMAR
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
