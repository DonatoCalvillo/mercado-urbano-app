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
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  SvgIconTypeMap,
  Typography,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { IUsuario } from "interfaces";
import { Dispatch, FC, SetStateAction } from "react";

interface Props {
  navItemsAdmin: {
    name: string;
    url: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
      muiName: string;
    };
  }[];
  navItemsUser: {
    name: string;
    url: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
      muiName: string;
    };
  }[];
  isLoggedIn: boolean;
  logout: () => void;
  user: IUsuario | undefined;
  navigateTo: (url: string) => void;
  activeMenu: boolean;
  setActiveMenu: Dispatch<SetStateAction<boolean>>;
}

export const SideMenu: FC<Props> = ({
  navItemsAdmin,
  navItemsUser,
  isLoggedIn,
  logout,
  user,
  navigateTo,
  activeMenu,
  setActiveMenu,
}) => {
  return (
    <Drawer
      open={activeMenu}
      anchor="right"
      sx={{ backdropFilter: "blur(2px)", transition: "all 0.5s ease-out" }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem style={{ display: "flex", justifyContent: "end" }}>
            <Button
              size="small"
              variant="text"
              onClick={() => setActiveMenu(false)}
            >
              <CloseIcon />
            </Button>
          </ListItem>
          <ListItem>
            <Typography variant="h1" color="#707070" textAlign="center">
              Mercado de progreso y bienestar
            </Typography>
          </ListItem>

          {!isLoggedIn && (
            <ListItem button onClick={() => navigateTo(`/auth`)}>
              <ListItemIcon>
                <AccountCircleOutlined />
              </ListItemIcon>
              <ListItemText primary={"Iniciar sesión"} />
            </ListItem>
          )}

          {(user?.rol_nombre === "Administrador" ||
            user?.rol_nombre === "SuperAdministrador") && (
            <>
              {navItemsAdmin.map((item, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => navigateTo(item.url)}
                >
                  <ListItemIcon>
                    <item.icon></item.icon>
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </>
          )}
          {user?.rol_nombre === "Usuario" ? (
            <>
              {navItemsUser.map((item, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => navigateTo(item.url)}
                >
                  <ListItemIcon>
                    <item.icon></item.icon>
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </>
          ) : (
            <Box></Box>
          )}

          {isLoggedIn && (
            <ListItem onClick={logout}>
              <ListItemIcon>
                <LoginOutlined />
              </ListItemIcon>
              <ListItemText primary={"Cerrar sesión"} />
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  );
};
