import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../layouts/dashboard/DashboardLayout';

import { Stack, Button, Container, Typography, Grid, Box } from '@mui/material';
import Iconify from '../../../components/iconify';
import { useGetAllReport } from '../hooks';
import AdminConsultCard from '../../../components/ConsultationCard/AdminConsults';

const Audits = ({ propId, res }) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const Appoints = useGetAllReport();
  const AllA = Appoints?.data;

  let AllPat = [];
  if (AllA) {
    const groupedAppappointments = AllA?.filter((e) => e?.status === 'Completed').reduce(
      (acc, e) => {
        if (!acc[e.user._id]) {
          acc[e.user._id] = { user: e.user, appappointments: [] };
        }
        acc[e.user._id].appappointments.push(e);
        return acc;
      },
      {}
    );

    AllPat = Object.values(groupedAppappointments);
  }

  return (
    <>
      <Layout name="Medical Reports" title="Report">
        <Container maxWidth="xl">
          <Button
            variant="text"
            onClick={handleGoBack}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            sx={{ mb: 0 }}
          >
            Go Back{' '}
          </Button>

          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h7" gutterBottom>
              All User's Medical Reports{' '}
            </Typography>
          </Stack>
          <Grid container spacing={2}>
            {AllPat?.map((group, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box mt={2}>
                  <AdminConsultCard group={group} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Layout>
    </>
  );
};
export default Audits;
