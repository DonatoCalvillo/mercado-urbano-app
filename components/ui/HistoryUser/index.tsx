import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { IUserHistory } from '../../../interfaces/IUsuario';
import { FC } from 'react';
import { Typography } from '@mui/material';

interface Column {
  id: 'nombreEvento' | 'nombrePlaza' | 'puntos' | 'fechaInicio' | 'fechaFin' |'numeroLugar' | 'dia';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'nombreEvento', label: 'Evento', minWidth: 100 },
  { id: 'nombrePlaza', label: 'Plaza', minWidth: 100 },
  { id: 'puntos', label: 'Puntos', minWidth: 100},
  { id: 'dia', label: 'Día', minWidth: 100},
  { id: 'numeroLugar', label: 'Lugar', minWidth: 100},
  { id: 'fechaInicio', label: 'Fecha Inicio', minWidth: 100},
  { id: 'fechaFin', label: 'Fecha Fin', minWidth: 100}
];

interface Data {
  nombreEvento: string;
  nombrePlaza: string;
  puntos: number;
  fecha: string;
}

function createData(
  nombreEvento: string,
  nombrePlaza: string,
  puntos: number,
  fecha: string
): Data {
  return { nombreEvento, nombrePlaza, puntos, fecha };
}

const rows = [
  createData('Corredor Gastronoico Semana 1',  'Parque Independecia', 1999, '2023-01-15'),
  createData('Corredor Gastronoico Semana 1',  'Parque Independecia', 1999, '2023-01-15'),
  createData('Corredor Gastronoico Semana 1',  'Parque Independecia', 1999, '2023-01-15'),
  createData('Corredor Gastronoico Semana 1',  'Parque Independecia', 1999, '2023-01-15'),
  createData('Corredor Gastronoico Semana 1',  'Parque Independecia', 1999, '2023-01-15'),
  createData('Corredor Gastronoico Semana 1',  'Parque Independecia', 1999, '2023-01-15')
];
interface Props {
  userHistory : IUserHistory[];
}

export const HistoryUser:FC<Props> = ({ userHistory }) => {
  console.log(userHistory)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{  width: '100%', overflow: 'hidden' }}>
      {
        userHistory.length > 0 ? (

          <>
           <TableContainer sx={{ maxHeight: 260 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {userHistory
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <Typography variant="h6" fontSize="20px" fontWeight="100" marginLeft="5px" color="#707070">
          No hay información del usuario.
          </Typography>
        )
      }
     
    </Paper>
  );
}