import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

// const navItems = ['Inicio', 'Dar de alta','Subir puntuacion', 'Reportes' ];
const navItems =[
  {
    name: 'Inicio',
    url: '/admin-dashboard'
  },
  {
    name: 'Dar de alta',
    url: '/admin-dashboard/alta-usuarios'
  },
  {
    name: 'Subir puntuacion',
    url: '/admin-dashboard/subir-puntuacion'
  }
]

export const Navbar = () => {
  return (
    <AppBar position="fixed" color='secondary' style={{ background: '#9D2449', boxShadow: "1px 5px 11px 4px rgba(0,0,0,0.23)" }}>
      <Toolbar >
        <Container>
          <Box display="flex" justifyContent="space-between">
            <Box sx={{ display: { xs: 'none', sm: 'flex', alignItems: "center" } }}>
              {navItems.map((item, index) => (
                <Link href={item.url} key={index} style={{ color: '#fff', background: "none", fontSize:"16px", fontWeight: "100", textDecoration: "none", marginRight: "10px", padding: "0"}}>
                  {item.name}
                </Link>
              ))}
            </Box>
            <Box display="flex" >  
              <Typography variant="h6" component="div" marginRight="50px">
                    Mercado de progreso y bienestar
              </Typography>
              <Button variant="text" style={{ color: "white", fontWeight: "100", fontSize: "16px" }}>Cerrar sesion</Button>
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  )
}