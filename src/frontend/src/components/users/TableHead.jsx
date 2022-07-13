import PropTypes from 'prop-types';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { Checkbox, TableCell, TableRow, Box } from '@mui/material';


const headCells = [
  {
    id: 'id',
    numeric: true,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'username',
    numeric: false,
    disablePadding: true,
    label: 'Username',
  },
  {
    id: 'last_name',
    numeric: false,
    disablePadding: true,
    label: 'Last name',
  },
  {
    id: 'first_name',
    numeric: false,
    disablePadding: true,
    label: 'First name',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: true,
    label: 'email',
  },
  {
    id: 'dateofbirth',
    numeric: false,
    disablePadding: true,
    label: 'Date of Birth',
  },
  {
    id: 'modify',
    numeric: false,
    disablePadding: true,
    label: 'Action',
  },
];

export function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};