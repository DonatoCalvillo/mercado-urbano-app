import React, { useContext, useState } from "react";
import { UserLayout } from "components/layouts";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { ErrorOutline } from "@mui/icons-material";
import Image from "next/image";

import SignIn from "../../../../public/icons/signin.svg";
import { IUsuarioRegistro } from "interfaces";
import { mercadoUrbanoApi } from "api";
import axios from "axios";
import { IUsuarioNuevo } from "../../../interfaces/IUsuario";
import Cookies from "js-cookie";
import { AuthContext } from "context";

type FormData = {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo: string;
  contrasenia: string;
  telefono: string;
  area: string;
  rol: string;
};

const AltaUsuarios = () => {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState(false);
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Datos
  const [userData, setUserData] = useState<IUsuarioRegistro>({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    correo: "",
    contrasenia: "",
    telefono: "",
    area: "",
    rol: "",
  });
  const [newUser, setNewUser] = useState<IUsuarioNuevo>({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    correo: "",
    telefono: "",
    area: "",
    contrasenia: "",
    matricula: "",
  });

  const createUser = async (event: any) => {
    try {
      const token = Cookies.get("token");
      let {
        area,
        rol,
        contrasenia,
        correo,
        nombre,
        apellido_materno,
        apellido_paterno,
        ...newUser
      } = userData;

      let sendData = {};
      if (contrasenia) {
        sendData = { ...newUser, contrasenia };
      } else {
        sendData = { ...newUser };
      }

      if (correo != "") sendData = { ...sendData, correo };

      if (rol == "Administrador") area = "Administrador";

      console.log(sendData);
      try {
        const { data } = await mercadoUrbanoApi.post(
          "/auth/register",
          {
            ...sendData,
            nombre: nombre.toUpperCase(),
            apellido_materno: apellido_materno.toUpperCase(),
            apellido_paterno: apellido_paterno.toUpperCase(),
            fk_area: area,
            fk_rol: rol,
          },
          {
            headers: { Authorization: `bearer ${token}` },
          }
        );

        setStatusMessage(data.success);
        setSnackMessage(data.message);
        setOpenAlert(true);

        if (!data.success) return 1;

        setNewUser(data.data.user);
        handleOpen();
        setUserData({
          nombre: "",
          apellido_paterno: "",
          apellido_materno: "",
          correo: "",
          contrasenia: "",
          telefono: "",
          area: "",
          rol: "",
        });
      } catch (error: any) {
        console.log(error.response.data.message);
        setStatusMessage(false);
        setSnackMessage(error.response.data.message);
        setOpenAlert(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error))
        console.log(error.response?.data.data.message);

      setStatusMessage(false);
      setSnackMessage("Algo salio mal, verifique los datos.");
      setOpenAlert(true);
    }
  };

  const handleInputChange = (event: any) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <>
      <UserLayout
        title="Dar de alta usuario"
        pageDescription="Página usada para dar de alta usuarios nuevos para el programa del Mercado urbano."
      >
        <Box minHeight="100vh">
          <Container
            maxWidth="lg"
            sx={{
              marginTop: {
                lg: "100px",
                md: "100px",
                sm: "100px",
                xs: "100px",
              },
            }}
          >
            <Typography variant="h1" marginTop="50px" color="#707070">
              Dar de alta
            </Typography>
            <Grid container display="flex" alignItems="center">
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <form
                  onSubmit={handleSubmit(createUser)}
                  noValidate
                  style={{
                    marginTop: "50px",
                  }}
                >
                  <Box sx={{ width: 350 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography fontSize="16px" variant="h3" component="h3">
                          Usuario
                        </Typography>
                        <Chip
                          label="Credenciales incorrectas"
                          color="error"
                          icon={<ErrorOutline />}
                          className="fadein"
                          sx={{ display: showError ? "flex" : "none" }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          label="Nombre*"
                          variant="filled"
                          fullWidth
                          {...register("nombre", {
                            required: "Este campo es requerido.",
                          })}
                          error={!!errors.nombre}
                          helperText={errors.nombre?.message}
                          onChange={handleInputChange}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          label="Apellido paterno*"
                          variant="filled"
                          fullWidth
                          {...register("apellido_paterno", {
                            required: "Este campo es requerido.",
                            minLength: {
                              value: 2,
                              message: "Minimo 2 caracteres.",
                            },
                          })}
                          error={!!errors.apellido_paterno}
                          helperText={errors.apellido_paterno?.message}
                          onChange={handleInputChange}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          label="Apellido materno*"
                          variant="filled"
                          fullWidth
                          {...register("apellido_materno", {
                            required: "Este campo es requerido.",
                            minLength: {
                              value: 2,
                              message: "Minimo 2 caracteres.",
                            },
                          })}
                          error={!!errors.apellido_materno}
                          helperText={errors.apellido_materno?.message}
                          onChange={handleInputChange}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          label="Correo"
                          type="email"
                          variant="filled"
                          fullWidth
                          {...register("correo", {})}
                          error={!!errors.correo}
                          helperText={errors.correo?.message}
                          onChange={handleInputChange}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          label="Contraseña"
                          type="password"
                          variant="filled"
                          fullWidth
                          {...register("contrasenia", {})}
                          error={!!errors.contrasenia}
                          helperText={errors.contrasenia?.message}
                          onChange={handleInputChange}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          label="Telefono"
                          variant="filled"
                          fullWidth
                          {...register("telefono", {})}
                          error={!!errors.telefono}
                          helperText={errors.telefono?.message}
                          onChange={handleInputChange}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel
                            id="rol-label"
                            onChange={handleInputChange}
                          >
                            Rol*
                          </InputLabel>
                          <Select
                            fullWidth
                            labelId="rol-label"
                            id="rol-label"
                            label="Rol"
                            {...register("rol", {
                              required: true,
                            })}
                            error={!!errors.area}
                            onChange={handleInputChange}
                          >
                            {user?.rol_nombre === "SuperAdministrador" && (
                              <MenuItem value="Administrador">
                                Administrador
                              </MenuItem>
                            )}
                            <MenuItem value="Usuario">Usuario</MenuItem>
                          </Select>
                          {errors.area && (
                            <FormHelperText>
                              Este campo es requerido.
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>

                      {userData.rol !== "Administrador" && (
                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <InputLabel
                              id="area-label"
                              onChange={handleInputChange}
                            >
                              Área*
                            </InputLabel>
                            <Select
                              fullWidth
                              labelId="area-label"
                              id="area-label"
                              label="Zona"
                              {...register("area", {
                                required: true,
                              })}
                              error={!!errors.area}
                              onChange={handleInputChange}
                            >
                              <MenuItem value="Gastronomia">
                                Gastronomía
                              </MenuItem>
                              <MenuItem value="Comercio">Comercio</MenuItem>
                            </Select>
                            {errors.area && (
                              <FormHelperText>
                                Este campo es requerido.
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                      )}

                      <Grid item xs={12}>
                        <Button
                          color="success"
                          variant="outlined"
                          type="submit"
                          size="large"
                          fullWidth
                        >
                          Registrar
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </form>
              </Grid>
              <Grid
                item
                xs={0}
                sm={0}
                md={6}
                lg={6}
                width="60%"
                sx={{
                  display: {
                    lg: "flex",
                    md: "flex",
                    sm: "none",
                    xs: "none",
                  },
                }}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  src="https://res.cloudinary.com/djtf4beq7/image/upload/v1684084323/signin_fhqnfo.svg"
                  alt="puntos"
                  width={500}
                  height={343}
                />
              </Grid>
            </Grid>
          </Container>
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
            width="500px"
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Usuario generado
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography
                marginRight="10px"
                fontWeight="500"
                id="modal-modal-description"
                sx={{ mt: 2 }}
              >
                Nombre:
              </Typography>
              <Typography
                fontWeight="100"
                id="modal-modal-description"
                sx={{ mt: 2 }}
              >
                {`${newUser.nombre} ${newUser.apellido_paterno} ${newUser.apellido_materno}`}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography
                marginRight="10px"
                fontWeight="500"
                id="modal-modal-description"
                sx={{ mt: 2 }}
              >
                Matricula:
              </Typography>
              <Typography
                fontWeight="100"
                id="modal-modal-description"
                sx={{ mt: 2 }}
              >
                #{newUser.matricula}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography
                marginRight="10px"
                fontWeight="500"
                id="modal-modal-description"
                sx={{ mt: 2 }}
              >
                Área:
              </Typography>
              <Typography
                fontWeight="100"
                id="modal-modal-description"
                sx={{ mt: 2 }}
              >
                {newUser.area}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography
                marginRight="10px"
                fontWeight="500"
                id="modal-modal-description"
                sx={{ mt: 2 }}
              >
                Correo:
              </Typography>
              <Typography
                fontWeight="100"
                id="modal-modal-description"
                sx={{ mt: 2 }}
              >
                {newUser.correo}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography
                marginRight="10px"
                fontWeight="500"
                id="modal-modal-description"
                sx={{ mt: 2 }}
              >
                Contraseña:
              </Typography>
              <Typography
                fontWeight="100"
                id="modal-modal-description"
                sx={{ mt: 2 }}
              >
                {newUser.contrasenia}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography
                marginRight="10px"
                fontWeight="500"
                id="modal-modal-description"
                sx={{ mt: 2 }}
              >
                Telefono:
              </Typography>
              <Typography
                fontWeight="100"
                id="modal-modal-description"
                sx={{ mt: 2 }}
              >
                {newUser.telefono}
              </Typography>
            </Box>
            <Box marginTop="20px" display="flex" justifyContent="space-between">
              <Button
                style={{ marginRight: "10px" }}
                onClick={() => {
                  setSnackMessage(
                    "Esta funcionalidad esta próxima a su despliegue."
                  );
                  setOpenAlert(true);
                }}
                color="success"
                variant="outlined"
                type="submit"
                size="large"
                fullWidth
              >
                IMPRIMIR
              </Button>
              <Button
                onClick={handleClose}
                color="error"
                variant="outlined"
                type="submit"
                size="large"
                fullWidth
              >
                CERRAR
              </Button>
            </Box>
          </Box>
        </Modal>
      </UserLayout>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={statusMessage ? "success" : "error"}
          sx={{ width: "500px" }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AltaUsuarios;
