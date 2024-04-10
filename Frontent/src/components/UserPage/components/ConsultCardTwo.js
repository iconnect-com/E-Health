import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { ImageURL } from '../../../axios-Instance/constants';
import PDF from '../../../assets/pdf-icon.png';

export default function ConsultCardTwo({ data }) {
  const medicals = data?.medical_report ? ImageURL + data?.medical_report[0] : null;

  return (
    <Card
      sx={{
        p: 4,

        width: '100%',
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          mx: 0,
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
          <Typography variant="h7" sx={{ mt: 0, mb: 0 }}>
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
          <Typography variant="h7" sx={{ mt: 0, mb: 0 }}>
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
          <Typography variant="h7" sx={{ mt: 0, mb: 0 }}>
            Period{' '}
          </Typography>
          <Typography sx={{ mb: 0 }} variant="">
            {data?.period || 'N/A'}
          </Typography>
        </Box>

        {data?.medical_report && data?.medical_report?.length > 0 ? (
          <>
            <Box
              sx={{
                mt: 4,
                alignItems: 'left',
                borderRadius: 0,
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
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

        {data?.user_comments && data?.user_comments?.length > 0 ? (
          <>
            <Box
              sx={{
                mt: 4,
                alignItems: 'left',
                borderRadius: 0,
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Divider sx={{ my: 3 }} />
              <Typography variant="h7" sx={{ mt: 2, mb: 0 }}>
                User's Comment
              </Typography>

              <Typography sx={{ mb: 0 }} variant="">
                {data?.user_comments || 'N/A'}
              </Typography>
            </Box>
          </>
        ) : null}
      </Box>
    </Card>
  );
}

// {data?.user_comments && data?.user_comments?.length > 0 ? (
//   <>
//     <Box
//       sx={{
//         mt: 4,
//         alignItems: 'left',
//         borderRadius: 0,
//         borderColor: 'divider',
//         display: 'flex',
//         flexDirection: 'column',
//       }}
//     >
//       <Divider sx={{ my: 3 }} />
//       <Typography variant="h7" sx={{ mt: 2, mb: 0 }}>
//         User's Comment
//       </Typography>

//       <Typography sx={{ mb: 0 }} variant="">
//         {data?.user_comments || 'N/A'}
//       </Typography>
//     </Box>
//   </>
// ) : null}
// {data?.medical_report && data?.medical_report?.length > 0 ? (
//   <>
//     <Box
//       sx={{
//         mt: 4,
//         alignItems: 'left',
//         borderRadius: 0,
//         borderColor: 'divider',
//         display: 'flex',
//         flexDirection: 'column',
//       }}
//     >
//       <Typography variant="h7" sx={{ mt: -2, mb: 0 }}>
//         Medical Report{' '}
//       </Typography>
//       <Typography sx={{ mb: 0 }} variant="">
//         <a href={medicals} target="_blank" rel="noopener noreferrer">
//           <img alt="images" src={PDF} style={{ width: '50px', height: '50px' }} />
//         </a>
//       </Typography>
//     </Box>
//   </>
// ) : null}
