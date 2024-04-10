import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Avatar, Badge, Dialog, DialogContent, Tooltip } from '@mui/material';
import { ImageURL } from '../../../axios-Instance/constants';

export default function UserCardDoc({ data, res }) {
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
        // width: '100%',
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
          alignItems: 'left',
          mx: 6,
          borderRadius: 0,
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="p" sx={{ mt: 2, mb: 0, fontSize: '.8rem', fontWeight: 'bold' }}>
          Full Name{' '}
        </Typography>
        <Typography sx={{}} variant="">
          {data?.fullname || 'N/A'}
        </Typography>
      </Box>
      <Box
        sx={{
          alignItems: 'left',
          borderRadius: 0,
          mx: 6,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="" sx={{ fontSize: '.8rem', fontWeight: 'bold', mt: 2, mb: 0 }}>
          Gender{' '}
        </Typography>
        <Typography sx={{}} variant="p">
          {data?.gender || 'N/A'}
        </Typography>
      </Box>
      <Box
        sx={{
          alignItems: 'left',
          borderRadius: 0,
          mx: 6,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="" sx={{ fontSize: '.8rem', fontWeight: 'bold', mt: 2, mb: 0 }}>
          Status{' '}
        </Typography>
        <Typography sx={{}} variant="p">
          {data?.status || 'N/A'}
        </Typography>
      </Box>
      <Box
        sx={{
          alignItems: 'left',
          borderRadius: 0,
          mx: 6,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="" sx={{ fontSize: '.8rem', fontWeight: 'bold', mt: 2, mb: 0 }}>
          Specialization{' '}
        </Typography>
        <Typography sx={{}} variant="p">
          {data?.specialization || 'N/A'}
        </Typography>
      </Box>
    </Card>
  );
}
