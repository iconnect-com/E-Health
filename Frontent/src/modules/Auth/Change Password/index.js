import { Container, Typography, Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../../components/iconify';
import ChangePassword from './ChangePasswordForm';
import Layout from '../../../layouts/dashboard/DashboardLayout';

export default function ResetPassword() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Layout name="Profile" title="Profile">
        <Container maxWidth="xl">
          <Button
            variant="text"
            onClick={handleGoBack}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            sx={{ mb: 2 }}
          >
            Go Back{' '}
          </Button>{' '}
          <Typography variant="h7" gutterBottom>
            Change Password{' '}
          </Typography>
          <Typography variant="" gutterBottom>
            Please input both your previous password and your new desired password
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 3 }}>
            {' '}
          </Stack>
          <Typography variant="body3" sx={{ color: 'text.secondary' }}></Typography>
          <ChangePassword />
        </Container>
      </Layout>
    </>
  );
}
