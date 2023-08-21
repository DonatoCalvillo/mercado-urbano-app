import { Box, Button, Typography } from "@mui/material";
import { mercadoUrbanoApi } from "api";
import Cookies from "js-cookie";
import { CSSProperties, useEffect, useState } from "react";
import {
  IEventList,
  IEventListResponse,
} from "../interfaces/EventList.interface";
import Image from "next/image";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CreateEvent } from "../CreateEvent/index";

const styleMenu: CSSProperties = {
  fontWeight: "100",
  fontSize: "30px",
};

const styleSelectedMenu: CSSProperties = {
  fontWeight: "bold",
};

const arrEventStates = [
  {
    id: "",
    name: "Creación del evento",
  },
  { id: "REGISTRO", name: "Registro" },
  { id: "EVENTO", name: "Evento" },
  { id: "FINALIZO", name: "Finalización del evento" },
];

export const ListEvents = () => {
  const [areActiveEvents, setAreActiveEvents] = useState(false);
  const [activeEvents, setActiveEvents] = useState<IEventList[]>([]);

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const token = Cookies.get("token");
        const { data } = await mercadoUrbanoApi.get<IEventListResponse>(
          "/event/getActiveEvents"
        );

        if (!data.success) {
          setAreActiveEvents(false);
          return;
        }

        setAreActiveEvents(true);
        setActiveEvents(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllEvents();
  }, []);

  return (
    <>
      {areActiveEvents ? (
        <>
          <Typography
            fontWeight="bold"
            fontSize="25px"
            variant="h2"
            marginTop="50px"
          >
            Eventos activos:
          </Typography>
          <Box>
            {activeEvents.map(
              ({
                nombre,
                estado,
                fechaFin,
                fechaInicio,
                id,
                semana,
                plaza,
              }) => (
                <>
                  <Box
                    width="350px"
                    sx={{ boxShadow: 2 }}
                    marginTop="50px"
                    padding="10px"
                    textAlign="center"
                  >
                    <Image
                      src="https://res.cloudinary.com/djtf4beq7/image/upload/v1692554176/C%C3%A1rdenas_Parque_Independencia_lfrlux.jpg"
                      alt="Parque Independencia, Cárdenas"
                      width="350"
                      height="200"
                      style={{
                        width: "100%",
                      }}
                    />
                    <Typography fontWeight="bold" fontSize="25px">
                      {nombre} {semana}
                    </Typography>
                    <Typography fontWeight="400" fontSize="20px">
                      {plaza}
                    </Typography>
                    <Typography fontWeight="400" fontSize="20px">
                      H. Cárdenas, Tabasco.
                    </Typography>
                    <Box
                      width="100%"
                      display="flex"
                      justifyContent="space-between"
                      marginTop="20px"
                    >
                      <Typography fontWeight="200" fontSize="20px">
                        {fechaInicio}
                      </Typography>
                      <Typography fontWeight="200" fontSize="20px">
                        {fechaFin}
                      </Typography>
                    </Box>
                    <Typography
                      fontWeight="bold"
                      fontSize="24px"
                      color="#9D2449"
                      margin="20px 0"
                    >
                      {estado}
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      gap="20px"
                    >
                      <Button
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          background: "#9D2449",
                        }}
                        fullWidth
                      >
                        <DeleteForeverIcon />
                        Eliminar
                      </Button>
                      <Button
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          background: "#104DB7",
                        }}
                        fullWidth
                      >
                        <RemoveRedEyeIcon />
                        Ver
                      </Button>
                    </Box>
                  </Box>
                </>
              )
            )}
          </Box>
        </>
      ) : (
        <>
          <Box
            marginTop="50px"
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography fontWeight="bold" fontSize="24px">
              No hay eventos activos
            </Typography>

            <Button
              style={{
                background: "#1b5e20",
                width: "350px",
                padding: "10px 0",
                marginTop: "20px",
              }}
            >
              <AddIcon />
              Agregar evento
            </Button>
          </Box>
        </>
      )}

      <Box marginTop="50px">
        <hr />
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-evenly"
        >
          {arrEventStates.map((eventState, index) => {
            return (
              <>
                <Typography key={eventState.id} style={styleMenu}>
                  {eventState.name}
                </Typography>
                {index != 3 && <ArrowForwardIosIcon />}
              </>
            );
          })}
        </Box>
        <hr />
        <CreateEvent />
      </Box>
    </>
  );
};
