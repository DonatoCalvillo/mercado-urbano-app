import { Avatar, Box, Typography } from "@mui/material"
import Image from 'next/image';

import Difuminar from '../../../public/icons/difuminar.png';

export const InfoProfile = () => {
  return (
    <Box display="flex" alignItems="center" >
      <Avatar alt='Nombre del usaurio' src='' style={{ width: "100px", height: "100px" }}/>
      <Box marginLeft="20px">
        <Typography variant="h6" fontSize="20px" fontWeight="200" color="#707070">
          Hola, <span style={{ fontWeight: "800" }}>Nallely Dominique</span>
        </Typography>
        <Typography fontWeight="100" fontStyle="italic" variant="h6" fontSize="20px"  color="#707070">
          #CAR001-G
        </Typography>
        <Box display="flex" alignItems="center">
          <Image src={ Difuminar } alt="puntos" width={30}/>
          <Typography variant="h6" fontSize="20px" fontWeight="100" marginLeft="5px" color="#707070">
            1860 puntos
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
