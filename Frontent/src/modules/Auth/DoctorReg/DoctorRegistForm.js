import { useState } from 'react';
import { Stack, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDocRegister } from '../hooks';
import { useIsMutating } from '@tanstack/react-query';
import Iconify from '../../../components/iconify';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export default function DoctorRegistForm() {
  const { mutate, isSuccess, reset } = useDocRegister();
  const isLoading = useIsMutating();

  const formData = new FormData();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    phone_number: '',
    fullname: '',
    role: 'Doctor',
    license: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevData) => ({ ...prevData, [name]: value }));
  };

  const addFile = (file) => {
    if (!file) {
      swal('Please select a file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      swal('File is too large (maximum size is 5MB)');
      return;
    }

    setLoading(true);

    const fileURL = ['/uploads/' + file.name];

    setFormState((prevFormState) => ({
      ...prevFormState,
      license: fileURL,
    }));

    setFile(file);
    setLoading(false);
  };

  const handlePhoneInput = (event) => {
    const { name, value } = event.target;
    const phonePattern = /^[0-9]{10}$/;

    setFormState((prevData) => ({ ...prevData, [name]: value }));
    if (name === 'phone_number' && value.length === 10 && !phonePattern.test(value)) {
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Object.keys(formState).forEach((key) => {
      if (key !== 'license') {
        formData.append(key, formState[key]);
      }
    });

    if (file) {
      formData.append('license', file);
    }
    mutate(formData);
    if (isSuccess) {
      navigate('/login');
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          value={formState.fullname}
          onChange={handleInputChange}
          required
          name="fullname"
          type="text"
          label="Enter your Full Name"
        />
        <TextField
          value={formState.email}
          onChange={handleInputChange}
          required
          name="email"
          type="email"
          label="Email address"
        />
        <TextField
          value={formState.phone_number}
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
          value={formState.password}
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
        <TextField
          variant="outlined"
          required
          type="file"
          accept=".pdf"
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            if (selectedFile.type !== 'application/pdf') {
              swal('Invalid file type. Please select a PDF file.');
              e.target.value = null;
            } else {
              addFile(selectedFile);
            }
          }}
        />
        <Typography variant="body2" style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>
          INFO: Add a supporting document, as doctor's license.
          <br />
          NOTE: Only Pdf format is accepted
        </Typography>
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
