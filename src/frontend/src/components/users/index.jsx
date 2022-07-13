import './index.scss';
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { getAllUsers } from '../../client'
import EnhancedTableToolbar from './TableToolbar';
import Button from '@mui/material/Button';
import { stableSort, getComparator } from './sorting';
import { EnhancedTableHead } from './TableHead';
import Edit from './Edit';




const EnhancedTable = () => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [data, setData] = React.useState([]);
  const [selectedUsers, setSelectedUsers] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [row, setRow] = React.useState({});

  React.useEffect(() => {
    getAllUsers()
      .then((response) => {
        setData(response.data.map(u => { u.dateofbirth = u.dateofbirth.substring(0, 10); return u }));
      })
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    selectedUsers.includes(id) ?
      setSelectedUsers(old => {
        let indexOfVal = old.indexOf(id);
        old.splice(indexOfVal, 1);
        return old;
      })
      : setSelectedUsers(old => [...old, id]);

    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEdit = (r) => {
    setRow(r);
    setOpenEdit(true);
  }
  const handleCloseEdit = () => setOpenEdit(false);

  return (
    <Box sx={{ width: '89.8%', position: 'absolute', top: '0%', left: '10.1%' }}>
      <Paper sx={{ width: '100%' }}>
        <EnhancedTableToolbar setSelectedUsers={setSelectedUsers} setSelected={setSelected} data={data} setData={setData} selectedUsers={selectedUsers} numSelected={selected.length} open={open} openTab={handleOpen} closeTab={handleClose} />
        <Edit row={row} setData={setData} open={openEdit} openTab={handleOpenEdit} closeTab={handleCloseEdit} />

        <TableContainer style={{ maxHeight: '88.8vh' }}>
          <Table
            sx={{ minWidth: 750, minHeight: '88.8vh' }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody >
              {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}

                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row.id)}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={row.id}
                        scope="row"
                        padding="none"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell padding="none">{row.username}</TableCell>
                      <TableCell padding="none">{row.last_name}</TableCell>
                      <TableCell padding="none">{row.first_name}</TableCell>
                      <TableCell padding="none">{row.email}</TableCell>
                      <TableCell padding="none">{row.dateofbirth}</TableCell>
                      <TableCell padding="none">
                        <Button onClick={() => handleOpenEdit(row)} variant="outlined">Edit</Button></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default EnhancedTable;