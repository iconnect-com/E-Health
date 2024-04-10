import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context';
import { Stack } from '@mui/material';
import { useGetMe } from '../../../modules/Auth/hooks';
import { ImageURL } from '../../../axios-Instance/constants';

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const CurrentUser = useGetMe();
  const LoggedIn = CurrentUser?.data;

  useEffect(() => {
    if (LoggedIn?.photo) {
      const newPicture = ImageURL + LoggedIn?.photo;
      setPreviewImage(newPicture);
    }
  }, [LoggedIn?.photo]);

  const handleClose = () => {
    setOpen(null);
  };

  const [previewImage, setPreviewImage] = useState();

  const handleLogout = () => {
    authCtx.logout();
    window.location.reload(false);
    navigate('/');
  };

  const MENU_OPTIONS = [
    {
      label: 'Home',
      path: '/dashboard',
      icon: 'eva:home-fill',
    },
    {
      label: 'Profile',
      path:
        LoggedIn?.role === 'Doctor'
          ? '/doctor/profile'
          : LoggedIn?.role === 'Admin'
          ? '/app/profile'
          : '/patient/profile',
      icon: 'eva:person-fill',
    },
    // {
    //   label: 'Change Password',
    //   path: '/change-password',
    //   icon: 'eva:settings-2-fill',
    // },
  ];

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={previewImage}
          alt={LoggedIn?.fullname}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {LoggedIn?.fullname.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {LoggedIn?.fullname}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            ({LoggedIn?.role})
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              onClick={handleClose}
              component={Link}
              to={option.path}
              sx={{ my: 0.3 }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
          component={Link}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
