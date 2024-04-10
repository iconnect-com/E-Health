import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Avatar, Grid } from '@mui/material';
import useCountdown from '../../../utils/useCountdown';
import { ImageURL } from '../../../axios-Instance/constants';
import PDF from '../../../assets/pdf-icon.png';

export default function CallingCard({ data }) {
  const countdown = useCountdown(data?.appointment_date);
  const DocPicture = data?.doctor?.photo ? ImageURL + data?.doctor?.photo : '';
  const PatPicture = data?.user?.photo ? ImageURL + data?.user?.photo : '';
  const medicals = data?.medical_report ? ImageURL + data?.medical_report[0] : null;

  return (
    <Card
      sx={{
        p: 1,
        borderRadius: 0,
        display: 'flex',
        flexDirection: 'colomn',
        flexWrap: 'wrap',
        width: '100%',
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          flexBasis: '45%',
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 2,
            margin: 5,
            justifyContent: 'space-between',
          }}
        >
          <Avatar src={DocPicture} sx={{ width: 100, height: 100 }} />
          <Box
            sx={{
              alignItems: 'center',
              marginLeft: 3,
              gap: 1,
              borderRadius: 0,
              borderColor: 'divider',
              width: '100%',
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h4" sx={{ mt: 1, mb: 0 }}>
                Dr. {data?.doctor?.fullname}{' '}
              </Typography>
              <Typography sx={{ mb: 0 }} variant="">
                Phone: {data?.user?.phone_number || 'N/A'}
              </Typography>
              <Typography sx={{ fontSize: '.8rem', mt: 1, fontWeight: 'bold' }} variant="p">
                Your appointment with {data?.user?.fullname} is{' '}
                <Typography component="span" sx={{ color: 'red' }}>
                  {countdown}
                </Typography>{' '}
                Left
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            alignItems: 'center',
            mx: 6,
            gap: 2,
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
              Status{' '}
            </Typography>
            <Typography sx={{ mb: 0 }} variant="">
              {data?.doctor?.status || 'No Symptoms'}
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
              Appointment Status{' '}
            </Typography>
            <Typography sx={{ mb: 0 }} variant="">
              {data?.status || 'N/A'}
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Divider orientation="vertical" flexItem sx={{ mx: 5, my: 1 }} />

      <Grid
        container
        spacing={2}
        sx={{
          flexBasis: '45%',
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 2,
            margin: 5,
            justifyContent: 'space-between',
          }}
        >
          <Avatar src={PatPicture} sx={{ width: 100, height: 100 }} />
          <Box
            sx={{
              alignItems: 'center',
              marginLeft: 3,
              gap: 1,
              borderRadius: 0,
              borderColor: 'divider',
              width: '100%',
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h4" sx={{ mt: 1, mb: 0 }}>
                {data?.user?.fullname}{' '}
              </Typography>
              <Typography sx={{ mb: 0 }} variant="">
                Phone: {data?.user?.phone_number || 'N/A'}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            alignItems: 'center',
            mx: 6,
            gap: 2,
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
              {data?.symptoms || 'No Symptoms'}
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
              {data?.current_medication || 'No Medications'}
            </Typography>
          </Box>

          {data?.medical_report && data?.medical_report?.length > 0 ? (
            <>
              {' '}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: 1,
                }}
              >
                <Divider sx={{ my: 3 }} />
                <Typography variant="h7" sx={{ mt: -2, mb: 0 }}>
                  Medical Report{' '}
                </Typography>
                <Typography sx={{ mb: 0 }} variant="">
                  <a href={medicals} target="_blank" rel="noopener noreferrer">
                    <img alt="images" src={PDF} style={{ width: '50px', height: '50px' }} />
                  </a>
                </Typography>
              </Box>
            </>
          ) : null}
        </Box>
      </Grid>
    </Card>
  );
}
