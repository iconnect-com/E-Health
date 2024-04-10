import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Stack, Button, Container, Typography, Grid } from '@mui/material';
import Iconify from '../../../../../components/iconify';
import FormattedDate from '../../../../../utils/FormattedDate';
import Layout from '../../../../../layouts/dashboard/DashboardLayout';
import { useGetallAppointment } from '../../../../Patient/Hooks';

const PendingView = ({ propId, res }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const APPappointments = useGetallAppointment();

  const medic =
    APPappointments?.data?.filter((appointment) => appointment?.status === 'Pending') || [];
  const mappedData = medic?.map((item, index) => ({ ...item, index }));

  const appointment = mappedData?.find((appt) => appt?._id === id);

  return (
    <>
      <Layout name="View Consultation" title="Consultations">
        <Container maxWidth="xl">
          <Button
            variant="text"
            onClick={handleGoBack}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            sx={{ mb: 2 }}
          >
            Go Back{' '}
          </Button>

          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h7" gutterBottom>
              Pending Appappointments || {appointment?.appointment_type?.name}{' '}
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" sx={{ mb: 0 }}>
                Appointment Type
              </Typography>
              <Typography variant="h5" gutterBottom>
                {appointment?.appointment_type?.name || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" sx={{ mb: 0 }}>
                Appointment Date
              </Typography>
              <Typography variant="h5" gutterBottom>
                {/* {appointment?.appointment_date || "N/A"} */}
                {/* render: (appointment) =>{" "} */}
                <FormattedDate date={appointment.appointment_date} />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" sx={{ mb: 0 }}>
                Appointment Time
              </Typography>
              <Typography variant="h5" gutterBottom>
                {appointment?.appointment_time || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" sx={{ mb: 0 }}>
                Symptoms
              </Typography>
              <Typography variant="h5" gutterBottom>
                {appointment?.symptoms || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" sx={{ mb: 0 }}>
                Status
              </Typography>
              <Typography variant="h5" gutterBottom>
                {appointment?.status || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" sx={{ mb: 0 }}>
                Current Medications
              </Typography>
              <Typography variant="h5" gutterBottom>
                {appointment?.current_medication || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" sx={{ mb: 0 }}>
                Activity{' '}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {appointment?.activity || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" sx={{ mb: 0 }}>
                Period{' '}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {appointment?.period || 'N/A'}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  );
};
export default PendingView;
