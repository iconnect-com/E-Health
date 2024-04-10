import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import formatDateTime from '../../utils/formatDateTime';

const ConsultationCard = ({ appointment, index }) => {
  const navigate = useNavigate();
  const handleView = (res) => {
    navigate(`/patient/report/${appointment._id}`, { state: { appointment } });
  };

  return (
    <Card sx={{ mt: 2, minWidth: 275, cursor: 'pointer' }} onClick={handleView}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 1,

            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
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
              <Typography variant="h7" component="div">
                Dr. {appointment?.doctor?.fullname}
              </Typography>
              <Typography variant="h7" sx={{ mb: 1.5 }} color="text.secondary">
                Date: {formatDateTime(appointment?.updatedAt)}
              </Typography>
              <Typography variant="h7">
                {' '}
                Status:
                <Typography component="" sx={{ color: 'green' }}>
                  {appointment?.status}
                </Typography>{' '}
              </Typography>
              <Typography variant="body2">
                Details:{' '}
                <span style={{ fontSize: 11, fontWeight: 'bold' }}> {appointment?.diagnosis}</span>
              </Typography>
              <CardActions>
                <Button size="small" sx={{ ml: -2 }}>
                  VIEW MORE
                </Button>{' '}
              </CardActions>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ConsultationCard;
