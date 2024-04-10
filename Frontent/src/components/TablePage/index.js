import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import Iconify from '../iconify';
import { MenuItem } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.border,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function TablePage({ data, columns, actions }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenMenu = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns?.map((column) => (
              <StyledTableCell key={column.id}>{column.label}</StyledTableCell>
            ))}
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
            <StyledTableRow key={index}>
              {columns.map((column) => (
                <StyledTableCell key={column.id} align={column.align || 'left'}>
                  {column.render ? column.render(row) : row[column.id]}
                </StyledTableCell>
              ))}
              <StyledTableCell>
                <IconButton
                  size="medium"
                  color="inherit"
                  onClick={(event) => handleOpenMenu(event, row)}
                >
                  <Iconify icon={'eva:more-vertical-fill'} />
                </IconButton>

                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handleCloseMenu}
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  PaperProps={{
                    sx: {
                      p: 1,
                      width: 120,
                      '& .MuiMenuItem-root': {
                        px: 1,
                        typography: 'h7',
                        borderRadius: 0.75,
                      },
                    },
                  }}
                >
                  {actions?.map((action) => (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        action.onClick(currentRow);
                        handleCloseMenu();
                      }}
                    >
                      {action.icon && <Iconify icon={action.icon} sx={{ mr: 2 }} />}
                      {action.label}
                    </MenuItem>
                  ))}
                </Popover>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={data?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
