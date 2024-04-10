import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { useGetAllUserCount } from '../../../../modules/Auth/hooks';

export default function UserTablePage({
  data,
  getPrevPage,
  getNextPage,
  users = [],
  columns,
  index,
}) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [totalPages, setTotalPages] = useState();
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data?.map((n) => n.fullname);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    if (newPage > page && newPage <= totalPages && newPage * rowsPerPage >= data?.length) {
      getNextPage();
    } else if (newPage < page && newPage >= 0) {
      getPrevPage();
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: data,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered?.length && !!filterName;
  const UsersAll = useGetAllUserCount();

  useEffect(() => {
    if (UsersAll && UsersAll?.totalUser) {
      setTotalPages(Math.ceil(UsersAll.totalUser / rowsPerPage));
    }
  }, [UsersAll, rowsPerPage]);

  return (
    <Container maxWidth="xl">
      <Card>
        <UserTableToolbar
          numSelected={selected?.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <UserTableHead
              order={order}
              orderBy={orderBy}
              rowCount={data && data?.length}
              numSelected={selected.length}
              onRequestSort={handleSort}
              onSelectAllClick={handleSelectAllClick}
              headLabel={[
                { id: '' },
                { id: 'sn', label: 'S/N' },
                { id: 'fullname', label: 'Full Name', align: 'left' },
                { id: 'email', label: 'Email' },
                { id: 'role', label: 'Role' },
                { id: 'isApproved', label: 'Approval Status' },
                { id: 'status', label: 'Status' },
                { id: 'actions', label: 'Actions', align: 'center' },
                { id: 'empty' },
              ]}
            />
            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <UserTableRow
                    key={row?._id}
                    id={row?._id}
                    fullname={row?.fullname}
                    email={row?.email}
                    isApproved={row?.isApproved}
                    status={row?.status}
                    sn={row.index + 1}
                    role={row.role}
                    index={index + 1 + page * rowsPerPage}
                    handleClick={(event) => handleClick(event, row.name)}
                  />
                ))}
              <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, data?.length)} />

              {notFound && <TableNoData query={filterName} />}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          page={page}
          component="div"
          count={UsersAll?.totalUser || 0}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
