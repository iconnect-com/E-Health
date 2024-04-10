import { useState } from 'react';
import {
  Link,
  Typography,
  Divider,
  Stack,
  Card,
  TextField,
  IconButton,
  Box,
  InputAdornment,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { alpha, useTheme } from '@mui/material/styles';
import { bgGradient } from '../../../utils/cssStyles';
import { useIsMutating } from '@tanstack/react-query';
import Iconify from '../../../components/iconify';
import LoadingButton from '@mui/lab/LoadingButton';
import { useLogin } from '../hooks';
import bg4 from '../../../assets/background/overlay_4.jpg';

export default function Login() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { mutate } = useLogin();
  const isLoading = useIsMutating();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const renderForm = (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            value={formData.email}
            onChange={handleInputChange}
            required
            name="email"
            type="email"
            label="Email address"
          />

          <TextField
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
          <Link to="/forget-password" variant="body2" underline="hover" component={RouterLink}>
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="primary"
          loading={isLoading > 0}
        >
          Sign In
        </LoadingButton>
      </form>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: bg4,
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h5">Sign in to proceed</Typography>

          <Typography variant="body2" sx={{ mt: 1, mb: 5 }}>
            Don’t have an account?
            <Link to="/" variant="subtitle2" sx={{ ml: 0.5 }} component={RouterLink}>
              Get started
            </Link>
          </Typography>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}></Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
