import React, { useContext, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useIsMutating } from '@tanstack/react-query';
import { useBulkUpload } from '../../modules/Admin/hooks';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { AuthContext } from '../../context';
import VMCdOC from '../../assets/VMCS_users.xlsx';

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

export default function BulkUploadModal({ open, handleClose }) {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isLoading = useIsMutating();
  const { mutate, reset } = useBulkUpload();
  const { user } = useContext(AuthContext);
  const formData = new FormData();
  formData.append('user', user ? user : null);

  const [formState, setFormState] = useState({
    image: null,
  });

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
      file: fileURL,
    }));

    setFile(file);
    setLoading(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    formData.append('file', file);
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
              <Stack direction="column" alignItems="center" justifyContent="space-between" mb={3}>
                <Box>
                  <Typography variant="h3" gutterBottom>
                    Bulk upload Users{' '}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="p" gutterBottom>
                    Here, you can upload a CSV file containing the list of users you want to add to
                    the system. Download Sample CSV file{' '}
                    <a href={VMCdOC} download>
                      Click here to download
                    </a>
                  </Typography>
                </Box>
              </Stack>
              <Stack spacing={3}>
                <TextField
                  variant="outlined"
                  accept=".xls, .xlsx"
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
                Upload
              </LoadingButton>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
