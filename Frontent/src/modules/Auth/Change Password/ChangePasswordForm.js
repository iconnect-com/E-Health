import { useState } from 'react';
import { Stack, Button, TextField, IconButton, InputAdornment, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useIsMutating } from '@tanstack/react-query';
import Iconify from '../../../components/iconify';
import LoadingButton from '@mui/lab/LoadingButton';
import { useChangePassword } from '../hooks';
import { successAlert } from '../../../utils';

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: '',
    currentPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { mutate, reset } = useChangePassword();
  const isLoading = useIsMutating();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: () => {
        successAlert('Password changed sucessfully');
        reset();
        navigate('/');
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ position: 'relative', margin: 3, gap: 2, ml: 0, width: '90%' }}>
          <Grid item container xs={8} sm={8} md={5}>
            <TextField
              fullWidth
              label="Previous Password.."
              variant="outlined"
              value={formData?.currentPassword}
              name="currentPassword"
              type={showPassword ? 'text' : 'password'}
              onChange={handleInputChange}
              required
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
          </Grid>

          <Grid item container xs={8} sm={8} md={5}>
            <TextField
              fullWidth
              label="New Password.."
              variant="outlined"
              value={formData?.newPassword}
              name="newPassword"
              type={showPassword ? 'text' : 'password'}
              onChange={handleInputChange}
              required
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
          </Grid>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
          {/* <Link to="/forget-password" variant="subtitle2" underline="hover" component={RouterLink}>
            Forgot password?
          </Link> */}
        </Stack>

        <LoadingButton
          sx={{ marginRight: 6, marginTop: 4, width: '150px' }}
          size="large"
          type="submit"
          variant="contained"
          loading={Boolean(isLoading)}
        >
          Submit
        </LoadingButton>

        <Button
          onClick={handleGoBack}
          sx={{ marginRight: 6, marginTop: 4, width: '150px' }}
          size="large"
          type="submit"
          variant="outlined"
          color="error"
        >
          Cancel
        </Button>
      </form>
    </>
  );
}
