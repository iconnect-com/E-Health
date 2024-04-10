import { useEffect, useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link, useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { errorAlert, successAlert } from '../../../utils';
import { useResetPassword } from '../../../modules/Auth/hooks';
import { useIsMutating } from '@tanstack/react-query';

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
  });
  const { mutate, isSuccess, isError, reset, error } = useResetPassword();
  const isLoading = useIsMutating();

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
      navigate('/');
      successAlert('Password reset link sent to your email');
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
            name="email"
            label="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            type="email"
          />{' '}
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              {' '}
            </Stack>

            <Link to="/login" variant="subtitle2" underline="hover" component={RouterLink}>
              Remember password?
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
            Reset Password{' '}
          </LoadingButton>
        </Stack>
      </form>
    </>
  );
}
