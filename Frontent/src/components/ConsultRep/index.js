import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { CardMedia } from '@mui/material';
import { ImageURL } from '../../axios-Instance/constants';

const ConsultationReportGroups = ({ group, index }) => {
  const navigate = useNavigate();
  const profilepic = group?.user?.photo ? ImageURL + group?.user?.photo : '';

  const data = group?.appappointments?.map((item, index) => ({
    ...item,
    key: index,
    index,
  }));

  const handleView = (res) => {
    navigate(`/doctor/reports/user`, { state: { data } });
  };

  return (
    <Card sx={{ mt: -3, mb: 4, minWidth: 250, cursor: 'pointer' }} onClick={handleView}>
      <CardMedia sx={{ height: 140 }} image={profilepic} title={group?.user.fullname} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {group?.user.fullname}{' '}
        </Typography>
        <Typography variant="h7" color="text.secondary">
          Status: {group?.user?.status}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {group?.user?.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gender: {group?.user?.gender}
        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{ ml: 2 }} size="small">
          VIEW ALL REPORTS
        </Button>
      </CardActions>
    </Card>
  );
};

export default ConsultationReportGroups;
