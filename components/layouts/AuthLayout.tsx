import { FC, ReactNode } from "react";

import Image from 'next/image';
import  Head  from "next/head";

import { Box, Typography } from "@mui/material";

import Tabasco from '../../public/icons/TabascoLogo.png';
import Cardenas from '../../public/icons/CardenasLogo.png';

interface Props {
  children: ReactNode;
  title: string;
  pageDescription: string;
  imageFullUlr?: string;
}

export const AuthLayout: FC<Props> = ({ children, title, pageDescription, imageFullUlr }) => {
  return (
    <>
      <Head>
        <title>{ title }</title>

        <meta name="description" content={ pageDescription }/>

        <meta name="og:title" content={ title }/>
        <meta name="og:description" content={ pageDescription }/>

        {
          imageFullUlr && (
            <meta name="og:image" content={ imageFullUlr }/>
          )
        }
        
      </Head>

      <Box 
        style={{ background: "#ffffff" }} 
        display="flex" 
        position="absolute" 
        alignItems="center" 
        left="0" right="0" 
        margin="50px auto" 
        width="100%" 
        maxWidth="100%" 
        padding="20px 10%" 
        justifyContent="space-between">
        <Box display="flex" flexDirection="row" alignItems="center" >
          <Image src={ Cardenas } alt="puntos" width={150} style={{ marginRight: "30px" }}/>
          <Image src={ Tabasco } alt="puntos" width={100}/>
        </Box>
        <Box>
          <Typography variant="h1" fontSize="40px" color="#707070">
            MERCADO DE PROGRESO Y BIENESTAR
          </Typography>
        </Box>
      </Box>

      <main>
        { children }
      </main>

      <footer>
        
      </footer>
    </>
  )
}
