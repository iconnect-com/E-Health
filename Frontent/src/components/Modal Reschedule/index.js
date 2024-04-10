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

export default function ReschedulingModal({ open, handleClose, data, onSubmit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isLoading = useIsMutating();
  const { mutate, isSuccess, reset } = useUpdateAppointment(id);
  const [formData, setFormData] = useState(null);
  useEffect(() => {
    if (data) {
      setFormData({
        ...data,
        appointment_date: data.appointment_date || new Date().toISOString().split('T')[0],
        appointment_time:
          data.appointment_time ||
          new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
      });
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      { id: data._id, data: formData },
      {
        onSuccess: () => {
          successAlert('Appoinment has been rescheduled sucessfully');
          reset();
          navigate('/');
        },
      }
    );
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
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
            <form onSubmit={handleSubmit}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography alignItems="center" variant="h5" gutterBottom>
                  Reschedule Appointment
                </Typography>
              </Stack>
              <Stack spacing={3}>
                <Grid item sx={{ marginRight: 2 }} xs={12} sm={8} md={2}>
                  <TextField
                    type="date"
                    name="appointment_date"
                    value={
                      formData?.appointment_date
                        ? new Date(formData.appointment_date).toISOString().split('T')[0]
                        : ''
                    }
                    onChange={handleInputChange}
                    required
                    fullWidth
                    label="Date"
                    InputProps={{
                      inputProps: {
                        min: new Date().toISOString().split('T')[0],
                      },
                    }}
                  />
                </Grid>
                <Grid item sx={{ marginRight: 2 }} xs={12} sm={8} md={2}>
                  <TextField
                    type="time"
                    name="appointment_time"
                    value={formData?.appointment_time}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    label="Time"
                  />
                </Grid>
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

              <LoadingButton
                onClick={handleClose}
                sx={{ marginRight: 6, marginTop: 4, width: '150px' }}
                size="large"
                type="button"
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
