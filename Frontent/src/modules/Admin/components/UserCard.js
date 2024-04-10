import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Avatar, Badge, Dialog, DialogContent, Switch, Tooltip } from '@mui/material';
import { useGetAllUser, useUpdateUser } from '../../Auth/hooks';
import { successAlert } from '../../../utils';
import { ImageURL } from '../../../axios-Instance/constants';
import StatusColor from '../../../components/StatusColor';

export default function UserCard({ propId, res }) {
  const { id } = useParams();
  const { data: AllUsers } = useGetAllUser();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const data = AllUsers?.data?.find((user) => user?._id === id);
  const { mutate: mutateUpdateApproval } = useUpdateUser(id);
  const { mutate: mutateUpdateStatus } = useUpdateUser(id);

  const [userData, setUserData] = useState({
    status: 'Active',
  });
  const [userApprove, setUserApprove] = useState({
    isApproved: false,
  });

  useEffect(() => {
    if (data) {
      setUserData({
        ...data,
        status: data.status || 'Active',
      });

      setUserApprove({
        ...data,
        isApproved: data.isApproved || false,
      });
    }
  }, [data]);

  const handleToggleStatus = (e) => {
    setUserData(e.target.checked);
    const newUserData = {
      ...userData,
      status: userData.status === 'Active' ? 'InActive' : 'Active',
    };

    setUserData(newUserData);
    if (data) {
      mutateUpdateStatus({ id: data._id, data: newUserData });
      successAlert('Status set successfully');
    } else {
    }
  };

  const handleToggleApproval = (e) => {
    setUserApprove(e.target.checked);

    const newUserApprove = {
      ...userApprove,
      isApproved: !userApprove.isApproved,
    };

    setUserApprove(newUserApprove);
    if (data._id) {
      mutateUpdateApproval({ id: data._id, data: newUserApprove });
      successAlert('Approval set successfully');
    } else {
    }
  };

  const profilepic = data?.photo ? ImageURL + data?.photo : '';

  return (
    <Card
      sx={{
        p: 1,
        borderRadius: 0,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
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
          mx: 6,
          borderRadius: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="" sx={{ mt: 2, mb: 0 }}>
          User's Status{' '}
        </Typography>
        <Typography sx={{ fontSize: '.8rem', fontWeight: 'bold' }} variant="p">
          {<StatusColor status={data?.status} color={'#a661da'} bg={'rgba(166, 97, 218,0.1)'} /> ||
            'N/A'}
        </Typography>
      </Box>
      <Box
        sx={{
          position: 'relative',
          alignItems: 'center',
          mx: 0,
          borderRadius: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 45,
            left: 0,
            alignItems: 'center',
            mx: 10,
            borderRadius: 0,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Typography variant="body1">Inactive</Typography>
          <Switch
            checked={userData?.status === 'Active'}
            onChange={handleToggleStatus}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <Typography variant="body1">Active</Typography>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            alignItems: 'center',
            mx: 6,
            borderRadius: 0,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Typography variant="body1">Unapproved</Typography>
          <Switch
            checked={userApprove?.isApproved}
            onChange={handleToggleApproval}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <Typography variant="body1">Approved</Typography>
        </Box>
      </Box>
    </Card>
  );
}
