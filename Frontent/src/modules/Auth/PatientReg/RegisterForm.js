import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useIsMutating } from '@tanstack/react-query';
import { useRegister } from '../hooks';
import Iconify from '../../../components/iconify';

export default function RegisterForm() {
  const { mutate, isSuccess, reset } = useRegister();
  const isLoading = useIsMutating();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone_number: '',
    fullname: '',
    role: 'Patient',
    license: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePhoneInput = (event) => {
    const { name, value } = event.target;
    const phonePattern = /^[0-9]{10}$/;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === 'phone_number' && value.length === 10 && !phonePattern.test(value)) {
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(formData);
  };

  if (isSuccess) {
    navigate('/login');
    reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          value={formData.fullname}
          onChange={handleInputChange}
          required
          name="fullname"
          type="text"
          label="Enter your Full Name"
        />

        <TextField
          value={formData.email}
          onChange={handleInputChange}
          required
          name="email"
          type="email"
          label="Email address"
        />
        <TextField
          value={formData.phone_number}
          onChange={handlePhoneInput}
          required
          name="phone_number"
          type="tel"
          label="Phone Number"
          inputProps={{ pattern: '[0-9]*' }}
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

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      ></Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading > 0}
      >
        Sign Up
      </LoadingButton>
    </form>
  );
}
