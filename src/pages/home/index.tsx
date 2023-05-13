import { Box, Container, Typography } from "@mui/material";
import { UserLayout } from "components/layouts";
import React from "react";
import Image from "next/image";

import MU1 from "../../../public/images/MU-1.jpg";
import MU2 from "../../../public/images/MU-2.jpg";
import MU3 from "../../../public/images/MU-3.jpg";
import MU4 from "../../../public/images/MU-4.jpg";
import MU5 from "../../../public/images/MU-5.jpg";

import MercadoUrbano from "../../../public/icons/MercadoUrbano.png";
import Cardenas from "../../../public/icons/CardenasLogo.png";

const Home = () => {
  return (
    <UserLayout
      title="Inicio"
      pageDescription="Página de inicio para el programa del Mercado urbano."
    >
      <Box marginTop="100px" minHeight="100vh">
        <Container maxWidth="lg">
          <Typography variant="h1" marginBottom="50px" color="#707070">
            Iniciativa: Mercado de progreso y bienestar
          </Typography>
          <Box
            marginBottom="50px"
            display="flex"
            justifyContent="center"
            alignItems="end"
          >
            <Image
              style={{ marginRight: "50px" }}
              src={Cardenas}
              alt="puntos"
              width={150}
            />
            <Image src={MercadoUrbano} alt="puntos" width={200} />
          </Box>
          <Box
            sx={{
              maxWidth: "100%",
              maxHeight: "540px",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 1,
                gridTemplateRows: "repeat(2, 1fr)",
                gridTemplateAreas: `"image1 image1 image2 image3"
                                    "image1 image1 image4 image5"`,
              }}
            >
              <Box sx={{ gridArea: "image1" }}>
                <Image
                  src={MU1}
                  alt="puntos"
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
              <Box sx={{ gridArea: "image2" }}>
                <Image
                  src={MU2}
                  alt="puntos"
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
              <Box sx={{ gridArea: "image3" }}>
                <Image
                  src={MU3}
                  alt="puntos"
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
              <Box sx={{ gridArea: "image4" }}>
                <Image
                  src={MU4}
                  alt="puntos"
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
              <Box sx={{ gridArea: "image5" }}>
                <Image
                  src={MU5}
                  alt="puntos"
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography
              textAlign="center"
              fontSize="16px"
              variant="h3"
              marginTop="50px"
              color="#707070"
            >
              El Corredor Gastronómico es un evento semanal organizado por la
              Dirección de Fomento Económico y Turismo del municipio de
              Cárdenas, Tabasco, con el objetivo de impulsar el comercio local y
              promover la gastronomía de la región. Este evento tiene lugar
              todos los viernes y sábados en el parque principal de la ciudad y
              es una oportunidad para que varios locales se reúnan y promocionen
              sus productos. El evento está dividido en dos áreas: el área
              comercial y el área gastronómica. En el área comercial, los
              participantes exhiben y venden productos de diferentes rubros,
              como artesanías, ropa, accesorios y otros artículos. En el área
              gastronómica, se ofrecen una amplia variedad de platillos típicos
              de la región, preparados por los locales participantes, lo que
              permite a los visitantes degustar y conocer la riqueza culinaria
              de la zona. El Corredor Gastronómico tiene una duración de cuatro
              horas, desde las 6 pm hasta las 10 pm, y se lleva a cabo en un
              ambiente festivo y familiar, con música en vivo y actividades para
              niños. Este evento es impulsado por el gobierno local, con el fin
              de apoyar el desarrollo económico del municipio, incentivando el
              turismo y la actividad comercial en la zona. En resumen, el
              Corredor Gastronómico es un evento semanal que busca fomentar el
              comercio local y la gastronomía de la región, brindando una
              oportunidad para que los locales promuevan sus productos y
              servicios en un ambiente festivo y familiar. Este evento es una
              iniciativa de la Dirección de Fomento Económico y Turismo del
              municipio de Cárdenas, Tabasco, como parte de su estrategia de
              desarrollo económico y turístico.
            </Typography>
          </Box>
        </Container>
      </Box>
    </UserLayout>
  );
};

export default Home;
