import React, { useContext, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../layouts/dashboard/DashboardLayout';
import { AuthContext } from '../../../context';
import { Stack, Button, Container, Typography, Grid, Box } from '@mui/material';
import Iconify from '../../../components/iconify';
import { useGetAllReport } from '../../Admin/hooks';
import AllConsultationCard from '../../../components/ConsultationCard/AllAdminConsults';
import { LinearProgress } from '@material-ui/core';

const MedReports = ({ propId, res }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const Appoints = useGetAllReport();
  const AllA = Appoints?.data;
  const AllPat = AllA?.filter((e) => e?.user?._id === user?.id && e?.status === 'Completed');

  const mappedData = AllPat?.map((item, index) => ({
    ...item,
    key: index,
    index,
  }));

  return (
    <>
      <Layout name="All Appointment" title="Appappointments">
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
              Medical Reports{' '}
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            <Suspense fallback={<LinearProgress />}>
              {mappedData?.map((appointment, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box mt={2}>
                    <AllConsultationCard appointment={appointment} />
                  </Box>
                </Grid>
              ))}
            </Suspense>
          </Grid>
        </Container>
      </Layout>
    </>
  );
};
export default MedReports;
