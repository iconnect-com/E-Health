import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../layouts/dashboard/DashboardLayout';
import { Stack, Typography, Container, Button, Box, Grid } from '@mui/material';
import Iconify from '../../../components/iconify';
import DoctorCard from '../../../components/Doctor Card';
import { useGetDocList } from '../../Auth/hooks';

const OurDocs = ({ propId, res }) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const { getDoctorName: SeeDods } = useGetDocList();

  const mappedData = SeeDods?.map((item, index) => ({
    ...item,
    index: SeeDods?.length - index - 1,
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
              Know Your Doctors
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
