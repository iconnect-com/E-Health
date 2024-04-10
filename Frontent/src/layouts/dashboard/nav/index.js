import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Link, Drawer, Stack } from '@mui/material';
import useResponsive from '../../../hooks/useResponsive';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
import navConfig from './config';
import { useContext } from 'react';
import { AuthContext } from '../../../context';
import VMLogo from '../../../assets/group1.png';

const NAV_WIDTH = 200;

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const { user } = useContext(AuthContext);
  const userRoles = user?.role || [];
  const Homepage = () => {
    window.location.href = '/';
  };

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const userNavConfig =
    user && user.role ? navConfig.filter((item) => item.allowed.includes(user.role)) : [];

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box
        src={VMLogo}
        sx={{ wdpx: 2.2, py: 3, display: 'inline-flex', width: '150px', height: '20px' }}
      >
        {' '}
      </Box>

      <Box sx={{ mb: 5, mx: 3.5 }}>
        <Link underline="none">
          <img
            onClick={Homepage}
            src={VMLogo}
            style={{
              cursor: 'pointer',
              width: '100px',
              height: '40px',
            }}
            sx={{
              wdpx: 7.5,
              ml: 10,
              py: 1.5,
            }}
            alt="photoURL"
          />

          <Box sx={{ wdpx: 7.5, ml: 4, py: 1.5, display: 'inline-flex' }}> </Box>
        </Link>
      </Box>

      <NavSection data={userNavConfig} userRoles={userRoles} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{ pt: 5, borderRadius: 2, position: 'relative' }}
        ></Stack>
      </Box>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
