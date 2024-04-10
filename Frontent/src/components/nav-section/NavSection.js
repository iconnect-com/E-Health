import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { Box, List, ListItemText } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { StyledNavItem, StyledNavItemIcon } from './styles';
import { useContext } from 'react';
import { AuthContext } from '../../context';

NavSection.propTypes = {
  data: PropTypes.array,
  userRoles: PropTypes.string,
};

export default function NavSection({ data = [], userRoles, ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} userRoles={userRoles} />
        ))}
      </List>
    </Box>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
  userRoles: PropTypes.string,
};

function NavItem({ item, userRoles }) {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const { title, path, icon, info, allowed } = item;

  const handleLogout = () => {
    authCtx.logout();
    window.location.reload(false);
    navigate('/');
  };

  const isAllowed = allowed ? allowed.some((role) => userRoles.includes(role)) : true;
  if (!isAllowed) {
    return null;
  }

  if (title === 'Logout') {
    return (
      <StyledNavItem
        component={Link}
        to={path}
        onClick={handleLogout}
        sx={{
          '&.active': {
            color: 'text.primary',
            bgcolor: 'action.selected',
            fontWeight: 'fontWeightBold',
          },
        }}
      >
        <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

        <ListItemText disableTypography primary={title} />

        {info && info}
      </StyledNavItem>
    );
  }

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.white',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
