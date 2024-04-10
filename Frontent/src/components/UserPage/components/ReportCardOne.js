import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Avatar, Divider } from '@mui/material';
import FormattedDate from '../../../utils/FormattedDate';
import { ImageURL } from '../../../axios-Instance/constants';

export default function ReportCardOne({ data }) {
  const newPicture = data?.user?.photo ? ImageURL + data?.user?.photo : '';

  return (
    <Card
      sx={{
        p: 1,
        borderRadius: 0,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 0,
        }}
      >
        <Avatar src={newPicture} sx={{ width: 80, height: 80 }} />
      </Box>
      <Box
        sx={{
          alignItems: 'left',
          mx: 4,
          borderRadius: 0,
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="" sx={{ mt: 2, mb: 0 }}>
          fullname{' '}
        </Typography>
        <Typography sx={{ fontSize: '.8rem', fontWeight: 'bold' }} variant="p">
          {data?.user?.fullname}{' '}
        </Typography>
      </Box>
      <Divider orientation="vertical" flexItem sx={{ mx: 0 }} />
      <Box
        sx={{
          alignItems: 'left',
          mx: 4,
          borderRadius: 0,
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="" sx={{ mt: 2, mb: 0 }}>
          DOB{' '}
        </Typography>
        <Typography sx={{ fontSize: '.8rem', fontWeight: 'bold' }} variant="p">
          <FormattedDate date={data?.user?.date_of_birth} />
        </Typography>
      </Box>
      <Divider orientation="vertical" flexItem sx={{ mx: 0 }} />

      <Box
        sx={{
          alignItems: 'left',
          mx: 4,
          borderRadius: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="" sx={{ mt: 2, mb: 0 }}>
          Email{' '}
        </Typography>
        <Typography sx={{ fontSize: '.8rem', fontWeight: 'bold' }} variant="p">
          {data?.user?.email || 'N/A'}
        </Typography>
      </Box>
      <Divider orientation="vertical" flexItem sx={{ mx: 0 }} />

      <Box
        sx={{
          alignItems: 'left',
          mx: 4,
          borderRadius: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="" sx={{ mt: 2, mb: 0 }}>
          Phone Number{' '}
        </Typography>
        <Typography sx={{ fontSize: '.8rem', fontWeight: 'bold' }} variant="p">
          {data?.user?.phone_number || 'N/A'}
        </Typography>
      </Box>
      <Divider orientation="vertical" flexItem sx={{ mx: 0 }} />

      <Box
        sx={{
          alignItems: 'left',
          mx: 4,
          borderRadius: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="" sx={{ mt: 2, mb: 0 }}>
          Medical symptoms{' '}
        </Typography>
        <Typography sx={{ fontSize: '.8rem', fontWeight: 'bold' }} variant="p">
          {data?.symptoms || 'N/A'}
        </Typography>
      </Box>
    </Card>
  );
}
