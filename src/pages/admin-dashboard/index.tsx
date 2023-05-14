import React from "react";
import Image from "next/image";

import { Box, Container, Grid, Typography } from "@mui/material";
import { UserLayout } from "components/layouts";
import { InfoProfile } from "components/ui";

import MercadoUrbano from "../../../public/icons/MercadoUrbano.png";
import Cardenas from "../../../public/icons/CardenasLogo.png";

import { AdminDashboardTable } from "components/ui/AdminDashboardTable";
import { useState, useEffect } from "react";
import { GetStaticProps, NextPage } from "next";
import { mercadoUrbanoApi } from "api";
import { IUsuarioListado } from "../../../interfaces/IUsuario";
import Cookies from "js-cookie";

interface Props {
  usuarios: IUsuarioListado[];
}

const AdminDashboard = () => {
  // console.log({usuarios})
  const [selectedUser, setSelectedUser] = useState(false);
  const [usuarios, setUsuarios] = useState<IUsuarioListado[]>([]);
  const handleSelectedUser = (estado: boolean) => {
    setSelectedUser(estado);
  };

  return (
    <UserLayout
      title="Dashboard Administrador"
      pageDescription="Este es el dashboard para los administradores"
    >
      <Box minHeight="100vh" display="flex" alignItems="center">
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            sx={{
              marginTop: {
                lg: "50px",
                md: "100px",
                sm: "100px",
                xs: "100px",
              },
            }}
            marginTop="50px"
            color="#707070"
          >
            Panel administrativo
          </Typography>
          <Typography variant="h2" marginTop="10px" color="#707070">
            H. Cárdenas, Tabasco
          </Typography>
          <Grid
            container
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            marginTop="50px"
          >
            <Grid
              display="flex"
              justifyContent="center"
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
            >
              <InfoProfile admin={true} />
            </Grid>
            <Grid
              display="flex"
              justifyContent="center"
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              marginTop="10px"
            >
              <Grid
                container
                spacing={2}
                display="flex"
                justifyContent="center"
              >
                <Grid item>
                  <Image
                    src="https://res.cloudinary.com/djtf4beq7/image/upload/v1684046932/CardenasLogo_mkewrw.png"
                    alt="Logo de Cárdenas"
                    width={150}
                    height={121}
                  />
                </Grid>
                <Grid item>
                  <Image
                    src="https://res.cloudinary.com/djtf4beq7/image/upload/v1684047131/MercadoUrbano_jq4msh.png"
                    alt="Logo de Direccion de Fomento Economico y Turismo"
                    width={200}
                    height={99}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box marginTop="50px" width="100%">
            <Box display="flex" marginBottom="20px">
              <Typography margin="auto" variant="h2" color="#707070">
                Puntuaciones
              </Typography>
            </Box>
            <AdminDashboardTable
              usuarios={usuarios}
              selectedUser={selectedUser}
              handleSelectedUser={handleSelectedUser}
            />
          </Box>
        </Container>
      </Box>
    </UserLayout>
  );
};

export default AdminDashboard;
