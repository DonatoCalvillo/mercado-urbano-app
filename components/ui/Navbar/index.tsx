import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
  Home,
} from "@mui/icons-material";
import PasswordIcon from "@mui/icons-material/Password";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import MenuIcon from "@mui/icons-material/Menu";

import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/auth/AuthContext";
import { SideMenu } from "../SideMenu";

const navItemsAdmin = [
  {
    name: "Inicio",
    url: "/admin-dashboard",
    icon: AdminPanelSettings,
  },
  {
    name: "Dar de alta",
    url: "/admin-dashboard/alta-usuarios",
    icon: PersonAddIcon,
  },
  {
    name: "Subir puntuacion",
    url: "/admin-dashboard/subir-puntuacion",
    icon: UploadFileIcon,
  },
  {
    name: "Cambiar contraseña",
    url: "/change-password",
    icon: PasswordIcon,
  },
];

const navItemsUser = [
  {
    name: "Inicio",
    url: "/user-dashboard",
    icon: Home,
  },
  {
    name: "Cambiar contraseña",
    url: "/change-password",
    icon: PasswordIcon,
  },
];

export const Navbar = () => {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const [activeMenu, setActiveMenu] = useState(false);

  const navigateTo = (url: string) => {
    router.push(url);
  };

  const onLogout = () => {
    logout();
  };

  const openCloseMenu = () => {};

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
          <Box
            sx={{
              display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
            }}
            justifyContent="space-between"
          >
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
          <Box
            sx={{
              display: { lg: "none", md: "none", sm: "flex", xs: "flex" },
              justifyContent: { xs: "right" },
            }}
          >
            <Button
              size="small"
              variant="text"
              style={{ color: "#FFF" }}
              onClick={() => setActiveMenu(true)}
            >
              <MenuIcon />
            </Button>
          </Box>

          <SideMenu
            navItemsAdmin={navItemsAdmin}
            navItemsUser={navItemsUser}
            isLoggedIn={isLoggedIn}
            logout={onLogout}
            user={user}
            navigateTo={navigateTo}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        </Container>
      </Toolbar>
    </AppBar>
  );
};
