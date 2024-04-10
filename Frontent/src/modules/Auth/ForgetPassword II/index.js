import { styled } from '@mui/material/styles';
import { Container, Typography, Stack } from '@mui/material';
import ResetPasswordFormII from './ResetPasswordForm';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function ResetPassword() {
  return (
    <>
      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h7" gutterBottom>
              Recover password
            </Typography>
            <Typography variant="" gutterBottom>
              Let's get you back online, please input your new password{' '}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 3 }}
            >
              {' '}
            </Stack>
            <Typography variant="body3" sx={{ color: 'text.secondary' }}></Typography>

            <ResetPasswordFormII />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
