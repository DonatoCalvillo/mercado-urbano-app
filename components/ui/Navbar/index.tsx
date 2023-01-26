import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';

export const Navbar = () => {
  return (
    <AppBar position="static" color='secondary' style={{ background: '#9D2449', boxShadow: "1px 5px 11px 4px rgba(0,0,0,0.23)" }}>
      <Toolbar >
        <Container>
          <Box display="flex" justifyContent="right">  
            <Typography variant="h6" component="div" marginRight="50px">
                  Mercado de progreso y bienestar
            </Typography>
            <Button variant="text" style={{ color: "white", fontWeight: "100", fontSize: "16px" }}>Cerrar sesion</Button>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  )
}