import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Grid, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useIsMutating } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateAppointment } from '../../modules/Patient/Hooks';
import { successAlert } from '../../utils';

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

export default function ReviewModal({ open, handleClose, data, onSubmit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isLoading = useIsMutating();
  const { mutate, isSuccess, reset } = useUpdateAppointment(id);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (data) {
      setFormData({
        ...data,
        user_comments: '',
      });
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      { id: data._id, data: formData },
      {
        onSuccess: () => {
          successAlert('Review sent sucessfully');
          reset();
          navigate('/');
        },
      }
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
            <form onSubmit={handleSubmit}>
              <Stack direction="column" alignItems="center" justifyContent="space-between" mb={3}>
                <Box>
                  <Typography variant="h5" gutterBottom>
                    Add a review
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="p" gutterBottom>
                    Add a review as touching the just concluded virtual consultation. Please note,
                    you will only be able to add a review once, after which the review button won't
                    be visible again.
                  </Typography>
                </Box>
              </Stack>
              <Stack spacing={3}>
                <Grid item sx={{ marginRight: 2 }} xs={12} sm={8} md={2}>
                  <TextField
                    fullWidth
                    label="Add a review for the doctor........."
                    variant="outlined"
                    value={formData?.user_comments}
                    name="user_comments"
                    onChange={handleInputChange}
                    required
                    multiline
                    rows={4}
                  />
                </Grid>
              </Stack>

              <LoadingButton
                sx={{ marginRight: 6, marginTop: 4, width: '100px' }}
                size="small"
                type="submit"
                variant="contained"
                loading={Boolean(isLoading)}
              >
                Submit
              </LoadingButton>

              <LoadingButton
                onClick={handleClose}
                sx={{ marginRight: 6, marginTop: 4, width: '100px' }}
                size="small"
                type="submit"
                variant="outlined"
                color="error"
              >
                Cancel
              </LoadingButton>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
