import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../../layouts/dashboard/DashboardLayout';
import { Button, Container, Box, Card, Grid } from '@mui/material';
import { AuthContext } from '../../../context';
import Iconify from '../../../components/iconify/Iconify';
import { useGetallAppointment } from '../../Patient/Hooks';
import { LoadingButton } from '@mui/lab';
import CallingCard from '../../../components/UserPage/components/CallingCard';

const AppointmentView = ({ propId, res }) => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const Appoints = useGetallAppointment();
  const AllA = Appoints?.data;
  const AllAppoints = AllA?.filter((e) => e?.doctor?._id === user?.id && e?.status === 'Confirmed');

  const mappedData = AllAppoints?.map((item, index) => ({
    ...item,
    key: index,
    index,
  }));

  const appointment = mappedData?.find((appt) => appt?._id === id);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleClickOpen = () => {
    if (appointment?.teamsMeetingLink) {
      window.open(appointment.teamsMeetingLink, '_blank');
    }
  };

  const handleAddReport = () => {
    navigate(`/doctor/appointments/add-report/${appointment?._id}`, { state: { appointment } });
  };

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
          <Card sx={{ position: 'relative', gap: 4 }}>
            <Card
              sx={{
                position: 'relative',
                borderRadius: 0,
                margin: 2,
                boxShadow: 'none',
                width: '100%',
                mx: 3,
              }}
            >
              <CallingCard data={appointment} />{' '}
            </Card>
          </Card>

          <Box
            sx={{
              alignItems: 'left',
              mx: 2,
              borderRadius: 0,
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Grid container sx={{ my: 5, mx: 1 }} spacing={3}>
              <LoadingButton
                onClick={handleClickOpen}
                sx={{ marginRight: 6, marginTop: 1, width: '150px' }}
                size="large"
                type="submit"
                variant="contained"
                color="primary"
              >
                Join Meeting{' '}
              </LoadingButton>
              <Button
                onClick={handleAddReport}
                sx={{ marginRight: 6, marginTop: 1, width: '150px' }}
                size="large"
                type="submit"
                variant="outlined"
                color="primary"
              >
                Add Report{' '}
              </Button>
            </Grid>
          </Box>
        </Container>
      </Layout>
    </>
  );
};
export default AppointmentView;
