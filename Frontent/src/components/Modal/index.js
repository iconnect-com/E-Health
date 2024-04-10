import React, { useContext, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useIsMutating } from '@tanstack/react-query';
import { useAddDrug } from '../../modules/Admin/hooks';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { AuthContext } from '../../context';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};

export default function TransitionsModal({ open, handleClose }) {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isLoading = useIsMutating();
  const { mutate, reset } = useAddDrug();
  const { user } = useContext(AuthContext);
  const formData = new FormData();
  formData.append('user', user ? user : null);

  const [formState, setFormState] = useState({
    name: '',
    price: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const addFile = (file) => {
    if (!file) {
      swal('Please select a file');
      return;
    }

    setLoading(true);

    const fileURL = ['/uploads/' + file.name];

    setFormState((prevFormState) => ({
      ...prevFormState,
      image: fileURL,
    }));

    setFile(file);
    setLoading(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    formData.append('name', formState.name);
    formData.append('price', formState.price);
    formData.append('image', file);
    mutate(formData, {
      onSuccess: () => {
        reset();
        navigate('/dashboard');
      },
    });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form onSubmit={submitHandler}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography alignItems="center" variant="h5" gutterBottom>
                  Add A New Drug
                </Typography>
              </Stack>
              <Stack spacing={3}>
                <TextField
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  name="name"
                  type="name"
                  label="Input Drug Name"
                />

                <TextField
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  name="price"
                  type="text"
                  label="Input drug price"
                />

                <TextField
                  variant="outlined"
                  required
                  type="file"
                  onChange={(e) => {
                    const selectedFile = e.target.files[0];
                    addFile(selectedFile);
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
                Upload Drug
              </LoadingButton>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
