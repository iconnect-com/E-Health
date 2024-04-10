import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../../layouts/dashboard/DashboardLayout';
import { Stack, Typography, Container, Button, Box, Grid } from '@mui/material';
import Iconify from '../../../components/iconify';
import DoctorCard from '../../../components/Doctor Card/DoctorCardII';
import { useGetAllUser } from '../../Auth/hooks';

const OurDocs = ({ propId, res }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const { id } = useParams();
  const limit = 1000;
  const { data: AllUsers } = useGetAllUser(propId || id, limit);
  const USERS = AllUsers?.data?.filter((u) => u?.role === 'Doctor') || [];

  const mappedData = USERS?.map((item, index) => ({
    ...item,
    index: USERS?.length - index - 1,
  })).reverse();

  return (
    <>
      <Layout name="Pharmacy" title="Pharmacy">
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
              All Doctors
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            {mappedData?.map((group, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box mt={2}>
                  <DoctorCard group={group} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Layout>
    </>
  );
};

export default OurDocs;
