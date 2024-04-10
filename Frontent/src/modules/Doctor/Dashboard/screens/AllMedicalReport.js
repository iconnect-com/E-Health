import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../../../layouts/dashboard/DashboardLayout';
import { Stack, Button, Container, Typography, Grid, Box } from '@mui/material';
import Iconify from '../../../../components/iconify';
import UserConsultationReport from '../../../../components/ConsultRep/AllUserReport';

const UserMedReports = ({ propId, res }) => {
  const location = useLocation();
  const appointment = location.state?.data;
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const mappedData = appointment?.map((item, index) => ({
    ...item,
    key: index,
    index,
  }));

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

          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h7" gutterBottom>
              Medical Reports{' '}
            </Typography>
          </Stack>
          <Grid container spacing={2}>
            {mappedData?.map((appointment, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box mt={2}>
                  <UserConsultationReport appointment={appointment} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Layout>
    </>
  );
};
export default UserMedReports;
