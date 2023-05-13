import { FC, ReactNode } from "react";

import Image from "next/image";
import Head from "next/head";

import { Box, Grid, Typography } from "@mui/material";

import Cardenas from "../../public/icons/CardenasLogo.png";
import MercadoUrbano from "../../public/icons/MercadoUrbano.png";

interface Props {
  children: ReactNode;
  title: string;
  pageDescription: string;
  imageFullUlr?: string;
}

export const AuthLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUlr,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="description" content={pageDescription} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />

        {imageFullUlr && <meta name="og:image" content={imageFullUlr} />}
      </Head>

      <Grid
        container
        style={{ background: "#ffffff" }}
        display="flex"
        position="absolute"
        alignItems="center"
        left="0"
        right="0"
        margin="50px auto"
        width="100%"
        maxWidth="100%"
        padding="20px 10%"
        justifyContent="space-between"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={6}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={Cardenas}
            alt="puntos"
            width={150}
            style={{ marginRight: "30px" }}
          />
          <Image src={MercadoUrbano} alt="puntos" width={200} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Typography
            sx={{
              fontSize: {
                lg: 40,
                md: 30,
                sm: 25,
                xs: 25,
              },
              marginTop: {
                lg: 0,
                md: 5,
                sm: 5,
                xs: 5,
              },
              marginBottom: {
                lg: 0,
                md: 1,
                sm: 1,
                xs: 1,
              },
            }}
            textAlign="center"
            variant="h1"
            color="#707070"
          >
            MERCADO DE PROGRESO Y BIENESTAR
          </Typography>
        </Grid>
      </Grid>

      <main>{children}</main>

      <footer></footer>
    </>
  );
};
