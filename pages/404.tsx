import { Box, Button, Container, Typography } from "@mui/material";
import { UserLayout } from "../components/layouts/UserLayout";
import Image from "next/image";
import Image404 from "../../public/icons/Image404.svg";

const Custom404 = () => {
  return (
    <UserLayout
      title="Página no encontrada"
      pageDescription="No se encontro lo que estabas buscando,"
    >
      <Container sx={{ display: "flex" }}>
        <Box
          width="100%"
          height="90vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src="https://res.cloudinary.com/djtf4beq7/image/upload/v1684084157/Image404_ctaofy.svg"
            alt="No se encontro página."
            width={200}
            height={195}
            style={{ marginRight: "50px" }}
          />
          <Box maxWidth="300px">
            <Typography
              variant="h2"
              component="h2"
              fontSize="60px"
              fontWeight="600"
            >
              404
            </Typography>
            <Typography
              variant="h3"
              component="h3"
              fontSize="22px"
              fontWeight="100"
              margin="20px 0"
            >
              Ups... parece que lo que buscas ya no se encuentra aqui...
            </Typography>
            <Button
              variant="outlined"
              style={{ padding: "10px 20px", fontSize: "16px" }}
            >
              Regresar al inicio
            </Button>
          </Box>
        </Box>
      </Container>
    </UserLayout>
  );
};

export default Custom404;
