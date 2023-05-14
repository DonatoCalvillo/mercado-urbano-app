import { Copyright, ErrorOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  List,
  TextField,
  Typography,
} from "@mui/material";
import { mercadoUrbanoApi } from "api";
import { UserLayout } from "components/layouts";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  contraseniaUno: string;
  contraseniaDos: string;
};

const expreReg = /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

const ChangePassword = () => {
  const router = useRouter();

  const onChangePassword = async ({
    contraseniaUno,
    contraseniaDos,
  }: FormData) => {
    if (contraseniaDos != contraseniaUno) {
      setLabelError("No coinciden las contraseñas.");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
      return;
    }

    if (!expreReg.test(contraseniaUno)) {
      setLabelError("La contraseña no cumple el estandar.");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
      return;
    }

    try {
      const token = Cookies.get("token");

      console.log(token);
      const { data } = await mercadoUrbanoApi.put(
        "/auth/changePassword",
        {
          newPassword: contraseniaUno,
        },
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );

      router.replace("/auth");
    } catch (error) {
      setLabelError("Algo salio mal intente más tarde.");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
      return;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);
  const [labelError, setLabelError] = useState("");
  const [blockButton, setBlockButton] = useState(false);

  return (
    <UserLayout
      title="Dashboard Administrador"
      pageDescription="Este es el dashboard para los administradores"
    >
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          container
          sx={{
            width: {
              lg: "1000px",
              md: "800px",
              sm: "500px",
              xs: "400px",
            },
          }}
          height="500px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{
            boxShadow: "3px 3px 15px -1px rgba(0,0,0,0.3)",
          }}
        >
          <Grid item>
            <form
              onSubmit={handleSubmit(onChangePassword)}
              noValidate
              style={{
                background: "#ffffff",
                borderRadius: "10px",
                padding: "20px",
              }}
            >
              <Box sx={{ width: 350, padding: "10px 20px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h1" component="h1">
                      Cambiar contraseña
                    </Typography>
                    <Chip
                      label={labelError}
                      color="error"
                      icon={<ErrorOutline />}
                      className="fadein"
                      sx={{ display: showError ? "flex" : "none" }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Contraseña nueva"
                      type="password"
                      variant="filled"
                      fullWidth
                      {...register("contraseniaUno", {
                        required: "Este campo es requerido.",
                        minLength: {
                          value: 6,
                          message: "Minimo 6 caracteres.",
                        },
                      })}
                      error={!!errors.contraseniaUno}
                      helperText={errors.contraseniaUno?.message}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Repite la contraseña nueva"
                      type="password"
                      variant="filled"
                      fullWidth
                      {...register("contraseniaDos", {
                        required: "Este campo es requerido.",
                        minLength: {
                          value: 6,
                          message: "Minimo 6 caracteres.",
                        },
                      })}
                      error={!!errors.contraseniaDos}
                      helperText={errors.contraseniaDos?.message}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    {blockButton ? (
                      <Button
                        type="submit"
                        color="secondary"
                        size="large"
                        fullWidth
                        disabled
                      >
                        Ingresar
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        color="secondary"
                        size="large"
                        fullWidth
                      >
                        Cambiar contraseña
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Grid>
          <Grid item>
            <Typography
              variant="h2"
              component="h2"
              fontSize="16px"
              fontStyle="normal"
            >
              La contraseña debe tener al menos:
            </Typography>
            <List>
              <Typography
                variant="h2"
                component="h2"
                fontSize="16px"
                fontStyle="italic"
              >
                Una mayuscula
              </Typography>
              <Typography
                variant="h2"
                component="h2"
                fontSize="16px"
                fontStyle="italic"
              >
                Una minuscula
              </Typography>
              <Typography
                variant="h2"
                component="h2"
                fontSize="16px"
                fontStyle="italic"
              >
                Un número
              </Typography>
              <Typography
                variant="h2"
                component="h2"
                fontSize="16px"
                fontStyle="italic"
              >
                Un caracter especial ($%&)
              </Typography>
            </List>
          </Grid>
        </Grid>
      </Box>
    </UserLayout>
  );
};

export default ChangePassword;
