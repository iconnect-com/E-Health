import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export default function AddReportCardOne({ data }) {
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
            Complaints/Symptoms{' '}
          </Typography>
          <Typography sx={{ mb: 0 }} variant="">
            {data?.symptoms || 'N/A'}
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
            Current Medications{' '}
          </Typography>
          <Typography sx={{ mb: 0 }} variant="">
            {data?.current_medication || 'N/A'}
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
            Period{' '}
          </Typography>
          <Typography sx={{ mb: 0 }} variant="">
            {data?.period || 'N/A'}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
