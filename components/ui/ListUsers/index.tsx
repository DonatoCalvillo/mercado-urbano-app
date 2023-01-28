import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { FC } from 'react';

interface Column {
  id: 'matricula' | 'nombre' | 'puntos';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'matricula', label: 'Matricula', minWidth: 100 },
  { id: 'nombre', label: 'Nombre', minWidth: 100 },
  { id: 'puntos', label: 'Puntos', minWidth: 100, align: 'right' }
];

interface Data {
  matricula: string;
  nombre: string;
  puntos: number;
}

function createData(
  matricula: string,
  nombre: string,
  puntos: number,
): Data {
  return { matricula, nombre, puntos };
}

const rows = [
  createData('CAR001-G',  'Nallely Dominique', 1999),
  createData('CAR002-G',  'Nallely Dominique', 1999),
  createData('CAR003-G',  'Nallely Dominique', 1999),
  createData('CAR004-G',  'Nallely Dominique', 1999),
  createData('CAR005-G',  'Nallely Dominique', 1999),
  createData('CAR006-G',  'Nallely Dominique', 1999),
  createData('CAR007-G',  'Nallely Dominique', 1999),
  createData('CAR008-G',  'Nallely Dominique', 1999),
  createData('CAR009-G',  'Nallely Dominique', 1999),
  createData('CAR0010-G', 'Nallely Dominique', 1999),
  createData('CAR0011-G', 'Nallely Dominique', 1999),
  createData('CAR0012-G', 'Nallely Dominique', 1999),
  createData('CAR0013-G', 'Nallely Dominique', 1999),
  createData('CAR0014-G', 'Nallely Dominique', 1999),
  createData('CAR0015-G', 'Nallely Dominique', 1999),
];

interface Props {
  handleSelectedUser: (estado:boolean) => void;
}

export const ListUsers: FC<Props> = ({ handleSelectedUser }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickRow = (e: React.MouseEvent<HTMLElement>) => {
    console.log((e.target as Element).innerHTML)
    handleSelectedUser(true)
  }

  return (
    <Paper sx={{ maxHeight:"500px", minWidth: '400px', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440, minHeight: 440 }}>
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                
                return (
                  <TableRow  hover role="checkbox" tabIndex={-1} key={row.matricula}>
                    {columns.map((column, index) => {
                      console.log(index)
                      const value = row[column.id];
                      return (
                        <TableCell style={{ cursor: index === 0 ? 'pointer' : '' }} onClick={(e) => index === 0 ? handleClickRow(e) : ""} key={column.id} align={column.align} >
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
    </Paper>
  );
}