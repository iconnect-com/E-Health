import { useEffect, useState } from 'react';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate, useParams } from 'react-router-dom';
import { errorAlert, successAlert } from '../../../utils';
import { useNewResetPassword } from '../hooks';
import { useIsMutating } from '@tanstack/react-query';
import Iconify from '../../../components/iconify';

export default function ResetPasswordFormII() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    token: id,
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      token: id,
    }));
  }, [id]);

  const { mutate, isSuccess, isError, reset, error } = useNewResetPassword(id);
  const isLoading = useIsMutating();
  const [showPassword, setShowPassword] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };
  useEffect(() => {
    if (isSuccess) {
      reset();
      navigate('/login');
      successAlert('Password was changed successfully');
    }
  }, [isSuccess, navigate, reset]);

  useEffect(() => {
    if (isError) {
      errorAlert(error);
      reset();
    }
  }, [isError, error, reset]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            name="password"
            label="password"
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
          />{' '}
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            ></Stack>
          </Stack>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            loading={isLoading > 0}
          >
            Change Password{' '}
          </LoadingButton>
        </Stack>
      </form>
    </>
  );
}
