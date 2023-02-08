import { Avatar, Box, Typography } from "@mui/material"
import { AuthContext } from "context";
import Image from 'next/image';
import { FC, useContext } from "react";

import Difuminar from '../../../public/icons/difuminar.png';

interface Props {
  admin: boolean;
}

export const InfoProfile: FC<Props> = ({ admin }) => {

  const { user } = useContext(AuthContext);
  
  return (
    <Box display="flex" alignItems="center" >
      <Avatar alt='Nombre del usaurio' src='' style={{ width: "100px", height: "100px" }}/>
      <Box marginLeft="20px">
        <Typography variant="h6" fontSize="20px" fontWeight="200" color="#707070">
          Hola, <span style={{ fontWeight: "800" }}>{user?.nombre}</span>
        </Typography>
        <Typography fontWeight="100" fontStyle="italic" variant="h6" fontSize="20px"  color="#707070">
          #{user?.matricula}
        </Typography>
        {
          !admin &&
          (
            <Box display="flex" alignItems="center">
              <Image src={ Difuminar } alt="puntos" width={30}/>
              <Typography variant="h6" fontSize="20px" fontWeight="100" marginLeft="5px" color="#707070">
                {user?.puntos} puntos
              </Typography>
            </Box>
          )
        }
        
      </Box>
    </Box>
  )
}
