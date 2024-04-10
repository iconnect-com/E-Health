import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { ImageURL } from '../../axios-Instance/constants';
import { CardMedia } from '@mui/material';
import logo from '../../assets/group1.png';

const DoctorCard = ({ group, index }) => {
  const navigate = useNavigate();
  const profilepic = group?.photo ? ImageURL + group?.photo : '';

  const handleView = (res) => {
    navigate(`/patient/our-doctors/${group._id}`, { state: { group } });
  };
  return (
    <Card sx={{ mt: -3, mb: 4, minWidth: 250, cursor: 'pointer' }} onClick={handleView}>
      <CardMedia
        sx={{
          height: 10,
          paddingTop: '125%',
          minWidth: 200,
        }}
        image={profilepic || logo}
        title={group?.fullname}
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {group?.fullname}{' '}
        </Typography>
        <Typography variant="h7" color="text.secondary">
          Status: {group?.status}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {group?.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gender: {group?.gender}
        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{ ml: 2 }} size="small">
          VIEW DOCTOR PROFILE
        </Button>
      </CardActions>
    </Card>
  );
};

export default DoctorCard;
