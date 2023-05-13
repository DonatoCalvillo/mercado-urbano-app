import React, { useContext, useEffect, useState } from "react";

import Image from "next/image";

import { Box, Container, Typography } from "@mui/material";

import { UserLayout } from "components/layouts";
import { InfoProfile, Zone } from "components/ui";

import { mercadoUrbanoApi } from "api";

import { IEvento, IResponse } from "interfaces";

import { AuthContext } from "context";

import Cookies from "js-cookie";

import Cardenas from "../../../public/icons/CardenasLogo.png";
import MercadoUrbano from "../../../public/icons/MercadoUrbano.png";
import CroquisComercio from "../../../public/images/croquis_comercio.png";
import CroquisGastronomia from "../../../public/images/croquis_gastronomia.png";

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
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                marginTop="50px"
              >
                <InfoProfile admin={false} />
                <Zone
                  numeroLugar={event.lugar_numero}
                  inscrito={event.usuario_evento_inscrito}
                  fechaInscripcion={event.usuario_evento_fechaInscripcion}
                />
                <Box>
                  <Image src={Cardenas} alt="puntos" width={150} />
                  <Image src={MercadoUrbano} alt="puntos" width={200} />
                </Box>
              </Box>
              <Box
                marginTop="50px"
                minWidth="100%"
                display="flex"
                justifyContent="center"
              >
                <Image
                  src={
                    user?.area === "Gastronomia"
                      ? CroquisGastronomia
                      : CroquisComercio
                  }
                  alt="puntos"
                  width={1000}
                />
              </Box>
            </Container>
          </Box>
        </>
      ) : (
        <>
          {
            <Box
              marginTop="100px"
              height="100vh"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h1" color="#707070">
                {message}
              </Typography>
              <Typography variant="h2" color="#707070">
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
