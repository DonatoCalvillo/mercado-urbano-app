import { Box, Container, Typography } from "@mui/material";
import { UserLayout } from "components/layouts";
import { ListEvents } from "components/ui/Event/ListEvents";

const Event = () => {
  return (
    <UserLayout
      title="Gestor de eventos"
      pageDescription="Gestiona el evento correspondiente desde esta pagina y dale seguimiento a la misma."
    >
      <Container
        maxWidth="xl"
        style={{ marginTop: "100px", minHeight: "90vh" }}
      >
        <Typography variant="h1" fontSize="55px" color="#1d1d1d">
          Gestor de eventos
        </Typography>
        <Typography variant="body1" fontSize="20px" color="#1d1d1d">
          Bienvenido al gestor de eventos, desde aquí podrás administrar el
          evento, desde su creación (crear el evento asignándole el nombre y
          fechas correspondientes), el registro (ver a todos las personas que se
          han registrado antes del cierre del registro), el evento (la lista
          final de los usuarios registrados) y la finalización del evento (sube
          los puntajes en archivo correspondiente y finaliza el evento).
        </Typography>
        <ListEvents />
      </Container>
    </UserLayout>
  );
};

export default Event;
