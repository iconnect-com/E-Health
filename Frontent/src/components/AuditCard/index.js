import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { bgGradient } from '../../utils/cssStyles';

export default function AuditCard({ Audits }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
        }),
        height: 1,
      }}
    >
      <Card
        sx={{
          p: 3,
          width: 1,
          maxWidth: 300,
        }}
      >
        <Typography sx={{ mb: 2 }} variant="h7">
          {Audits?.diagnosis}
        </Typography>

        <Typography variant="body2" sx={{ mt: 2, mb: 0 }}>
          Patient's Name{' '}
        </Typography>
        <Typography sx={{ mb: 0 }} variant="h7">
          {Audits?.user}
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" sx={{ mt: 2, mb: 0 }}>
          Prescription{' '}
        </Typography>
        <Typography sx={{ mb: 0 }} variant="h7">
          {Audits?.prescription}
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" sx={{ mt: 0, mb: 0 }}>
          Doctor{' '}
        </Typography>
        <Typography sx={{ mb: 0 }} variant="h7">
          {Audits?.doctor}
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" sx={{ mt: 0, mb: 0 }}>
          Doctor's Advice{' '}
        </Typography>
        <Typography sx={{ mb: 4 }} variant="h7">
          {Audits?.routine_advice}
        </Typography>
      </Card>
    </Box>
  );
}
