import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Avatar, Badge, Dialog, DialogContent, Divider, Tooltip } from '@mui/material';
import { ImageURL } from '../../../axios-Instance/constants';
import FormattedDate from '../../../utils/FormattedDate';
import StatusColor from '../../../components/StatusColor';

export default function UserCard({ propId, data }) {
  const profilepic = data?.photo ? ImageURL + data?.photo : '';
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
      {' '}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 5,
        }}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          color="success"
          sx={{ '.MuiBadge-dot': { height: 11, width: 11 } }}
        >
          <Tooltip title="Click to view picture in full size">
            <Avatar
              src={profilepic}
              sx={{ width: 80, height: 80, cursor: 'pointer' }}
              onClick={handleClickOpen}
            />
          </Tooltip>
        </Badge>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <img src={profilepic} alt="Profile" style={{ width: '100%', height: 'auto' }} />
        </DialogContent>
      </Dialog>
      <Box
        sx={{
          alignItems: 'center',
          mx: 3,
          gap: 0,
          borderRadius: 0,
          borderColor: 'divider',
        }}
      >
        <Typography variant="h7" sx={{ mt: 4, mb: 0 }}>
          {data?.fullname}{' '}
        </Typography>
        <Typography sx={{ mb: 0 }} variant="">
          {data?.email || 'N/A'}
        </Typography>
      </Box>
      <Divider orientation="vertical" flexItem sx={{ mx: 0 }} />
      <Box
        sx={{
          alignItems: 'left',
          mx: 3,
          borderRadius: 0,
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="" sx={{ mt: 2, mb: 0 }}>
          Date of Birth{' '}
        </Typography>
        <Typography sx={{ fontSize: '.8rem', fontWeight: 'bold' }} variant="p">
          {data?.date_of_birth ? <FormattedDate date={data.date_of_birth} /> : 'N/A'}
        </Typography>
      </Box>
      <Divider orientation="vertical" flexItem sx={{ mx: 0 }} />
      <Box
        sx={{
          alignItems: 'left',
          mx: 3,
          borderRadius: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="" sx={{ mt: 2, mb: 0 }}>
          Status
        </Typography>
        <Typography sx={{ fontSize: '.8rem', fontWeight: 'bold' }} variant="p">
          <StatusColor status={data?.status} color={'#a661da'} bg={'rgba(166, 97, 218,0.1)'} />{' '}
        </Typography>
      </Box>
    </Card>
  );
}
