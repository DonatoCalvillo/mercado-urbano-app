import React, { useContext, useEffect, useState } from "react";

import Image from "next/image";

import { Box, Container, Grid, Typography } from "@mui/material";

import { UserLayout } from "components/layouts";
import { InfoProfile, Zone } from "components/ui";

import { mercadoUrbanoApi } from "api";

import { IEvento, IResponse } from "interfaces";

import { AuthContext } from "context";

import Cookies from "js-cookie";

const croquisComercio =
  "https://res.cloudinary.com/djtf4beq7/image/upload/v1684047731/croquis_comercio_nx7u7j.png";

const croquisGastronomia =
  "https://res.cloudinary.com/djtf4beq7/image/upload/v1684047728/croquis_gastronomia_thczpp.png";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);

  const [event, setEvent] = useState<IEvento>();
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const geUserEvent = async () => {
      try {
        const token = Cookies.get("token");
        const { data } = await mercadoUrbanoApi.get<IResponse>(
          "/event/eventList",
          {
            headers: { Authorization: `bearer ${token}` },
          }
        );
        console.log(data.message);
        setEvent(data.data);
        setMessage(data.message);
      } catch (error) {
        console.log(error);
      }
    };

    geUserEvent();
  }, []);

  return (
    <UserLayout
      title={"Corredor gastronomico - Home"}
      pageDescription={"Evento de corredor gastronómico Cárdenas, Tabasco."}
    >
      {event ? (
        <>
          <Box marginTop="100px" height="100vh">
            <Container maxWidth="lg">
              <Typography variant="h1" marginTop="50px" color="#707070">
                {`${event.evento_nombre} ${event.evento_semana}`}
              </Typography>
              <Typography variant="h2" marginTop="10px" color="#707070">
                H. Cárdenas, Tabasco | {event.plaza_nombre} |{" "}
                {event.evento_hora} hrs
              </Typography>
              <Grid
                container
                display="flex"
                alignItems="center"
                justifyContent="center"
                marginTop="50px"
              >
                <Grid item>
                  <InfoProfile admin={false} />
                </Grid>
                <Grid item>
                  <Zone
                    numeroLugar={event.lugar_numero}
                    inscrito={event.usuario_evento_inscrito}
                    fechaInscripcion={event.usuario_evento_fechaInscripcion}
                  />
                </Grid>
                <Grid item>
                  <Grid container display="flex" justifyContent="center">
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
              <Box
                marginTop="50px"
                width="100%"
                display="flex"
                justifyContent="center"
              >
                <Image
                  src={
                    user?.area === "Gastronomia"
                      ? croquisGastronomia
                      : croquisComercio
                  }
                  alt="puntos"
                  width={870}
                  height={1160}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    padding: 0,
                    margin: 0,
                    marginBottom: "40px",
                  }}
                />
              </Box>
            </Container>
          </Box>
        </>
      ) : (
        <>
          {
            <Box
              // marginTop="100px"
              height="100vh"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography textAlign="center" variant="h1" color="#707070">
                {message}
              </Typography>
              <Typography textAlign="center" variant="h2" color="#707070">
                Favor de comunicarse con soporte.
              </Typography>
            </Box>
          }
        </>
      )}
    </UserLayout>
  );
};

export default UserDashboard;
