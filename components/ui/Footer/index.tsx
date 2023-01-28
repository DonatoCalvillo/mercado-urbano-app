import { Box, Typography } from '@mui/material'
import React from 'react'

export const Footer = () => {
  return (
    <Box justifyContent="center" display="flex" alignItems="center" marginTop="50px" width="100%" style={{ height:"150px", background: "#9D2449"}}>
      <Typography style={{ color: "#ffffff" }} variant="body2" color="text.secondary" align="center">
      H. Ayuntamiento de Cárdenas, Tabasco 2021 - 2024 - Derechos Reservados
      </Typography>
    </Box>
  )
}
