import { useState } from 'react';
import PropTypes from 'prop-types';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Iconify from '../../iconify';
import StatusColor from '../../../components/StatusColor';
import { useNavigate } from 'react-router-dom';
export default function UserTableRow({
  selected,
  isApproved,
  fullname,
  role,
  status,
  handleClick,
  index,
  email,
  row,
  id,
}) {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOpenView = () => {
    navigate(`/app/users/all/${id}`);
  };

  return (
    <>
      <TableRow key={index} hover tabIndex={-1}>
        <TableCell />
        <TableCell>{index + 0}</TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Typography variant="subtitle1">{fullname}</Typography>
        </TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{role}</TableCell>
        <TableCell>
          <StatusColor status={isApproved} color={'#a661da'} bg={'rgba(166, 97, 218,0.1)'} />
        </TableCell>
        <TableCell>
          <StatusColor status={status} color={'#a661da'} bg={'rgba(166, 97, 218,0.1)'} />
        </TableCell>
        <TableCell align="center">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleOpenView}>
          <Iconify icon="eva:eye-fill" sx={{ mr: 2 }} />
          View
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
