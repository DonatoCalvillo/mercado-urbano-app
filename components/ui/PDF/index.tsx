import { Box, Button, Modal, Typography } from "@mui/material";
import { IUsuarioNuevo } from "interfaces";
import { FC } from "react";

interface Props {
  newUser: IUsuarioNuevo;
}

export const ContactPDF: FC<Props> = ({ newUser }) => {
  return (
    <Modal
      open={true}
      // onClose={handleClose}
      aria-labelledby="nuevo-usuario"
      aria-describedby="modal-modal-description"
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        width="500px"
        style={{
          transform: "translate(-50%, -50%)",
          boxShadow: "24",
          background: "#ffffff",
          padding: "50px",
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Usuario generado
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography
            marginRight="10px"
            fontWeight="500"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            Nombre:
          </Typography>
          <Typography
            fontWeight="100"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            {`${newUser.nombre} ${newUser.apellido_paterno} ${newUser.apellido_materno}`}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography
            marginRight="10px"
            fontWeight="500"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            Matricula:
          </Typography>
          <Typography
            fontWeight="100"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            #{newUser.matricula}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography
            marginRight="10px"
            fontWeight="500"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            Área:
          </Typography>
          <Typography
            fontWeight="100"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            {newUser.area}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography
            marginRight="10px"
            fontWeight="500"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            Correo:
          </Typography>
          <Typography
            fontWeight="100"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            {newUser.correo}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography
            marginRight="10px"
            fontWeight="500"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            Contraseña:
          </Typography>
          <Typography
            fontWeight="100"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            {newUser.contrasenia}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography
            marginRight="10px"
            fontWeight="500"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            Telefono:
          </Typography>
          <Typography
            fontWeight="100"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            {newUser.telefono}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};
