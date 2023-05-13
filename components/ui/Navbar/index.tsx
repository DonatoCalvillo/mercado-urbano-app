import {
  AppBar,
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth/AuthContext";

// const navItems = ['Inicio', 'Dar de alta','Subir puntuacion', 'Reportes' ];
const BASE_URL = "http://localhost:3000";
const navItemsAdmin = [
  {
    name: "Inicio",
    url: "/admin-dashboard",
  },
  {
    name: "Dar de alta",
    url: "/admin-dashboard/alta-usuarios",
  },
  {
    name: "Subir puntuacion",
    url: "/admin-dashboard/subir-puntuacion",
  },
  {
    name: "Cambiar contraseña",
    url: "/change-password",
  },
];

const navItemsUser = [
  {
    name: "Inicio",
    url: "/user-dashboard",
  },
  {
    name: "Cambiar contraseña",
    url: "/change-password",
  },
];

export const Navbar = () => {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  const navigateTo = (url: string) => {
    router.push(url);
  };

  const onLogout = () => {
    logout();
  };

  return (
    <AppBar
      position="fixed"
      color="secondary"
      style={{
        background: "#9D2449",
        boxShadow: "1px 5px 11px 4px rgba(0,0,0,0.23)",
      }}
    >
      <Toolbar>
        <Container>
          <Box display="flex" justifyContent="space-between">
            {(user?.rol_nombre === "Administrador" ||
              user?.rol_nombre === "SuperAdministrador") && (
              <Box
                sx={{
                  display: { xs: "none", sm: "flex", alignItems: "center" },
                }}
              >
                {navItemsAdmin.map((item, index) => (
                  <Button
                    onClick={() => navigateTo(item.url)}
                    key={index}
                    style={{
                      color: "#fff",
                      background: "none",
                      fontSize: "16px",
                      fontWeight: "100",
                      textDecoration: "none",
                      marginRight: "10px",
                      padding: "0",
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>
            )}

            {user?.rol_nombre === "Usuario" ? (
              <Box
                sx={{
                  display: { xs: "none", sm: "flex", alignItems: "center" },
                }}
              >
                {navItemsUser.map((item, index) => (
                  <Button
                    onClick={() => navigateTo(item.url)}
                    key={index}
                    style={{
                      color: "#fff",
                      background: "none",
                      fontSize: "16px",
                      fontWeight: "100",
                      textDecoration: "none",
                      marginRight: "10px",
                      padding: "0",
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>
            ) : (
              <Box></Box>
            )}

            <Box display="flex">
              <Typography variant="h6" component="div" marginRight="50px">
                Mercado de progreso y bienestar
              </Typography>

              {isLoggedIn ? (
                <Button
                  onClick={onLogout}
                  variant="text"
                  style={{
                    color: "white",
                    fontWeight: "100",
                    fontSize: "16px",
                  }}
                >
                  Cerrar sesión
                </Button>
              ) : (
                <Button
                  onClick={() => navigateTo(`/auth`)}
                  variant="text"
                  style={{
                    color: "white",
                    fontWeight: "100",
                    fontSize: "16px",
                  }}
                >
                  Iniciar sesión
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
