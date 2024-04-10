import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export default function ReportDocTwo({ data }) {
  return (
    <Card
      sx={{
        p: 8,
        width: '100%',
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          mx: 6,
          gap: 6,
          borderRadius: 0,
          borderColor: 'divider',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 1,
          }}
        >
          <Typography variant="h7" sx={{ mt: 2, mb: 0 }}>
            Diagnosis{' '}
          </Typography>
          <Typography sx={{ mb: 0 }} variant="">
            {data?.diagnosis || 'N/A'}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 1,
          }}
        >
          <Typography variant="h7" sx={{ mt: 2, mb: 0 }}>
            Prescriptions{' '}
          </Typography>
          <Typography sx={{ mb: 0 }} variant="">
            {data?.prescription || 'N/A'}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 1,
          }}
        >
          <Typography variant="h7" sx={{ mt: 2, mb: 0 }}>
            Routine Advice{' '}
          </Typography>
          <Typography sx={{ mb: 0 }} variant="">
            {data?.routine_advice || 'N/A'}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
