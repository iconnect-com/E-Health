import React, { useContext, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Avatar, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { AuthContext } from '../../../context';
import { useGetMe, useUploadProfile } from '../../Auth/hooks';
import FormattedDate from '../../../utils/FormattedDate';
import swal from 'sweetalert';
import { ImageURL } from '../../../axios-Instance/constants';
import StatusColor from '../../../components/StatusColor';

export default function ProfileCard({ data }) {
  const { user } = useContext(AuthContext);
  const { mutate } = useGetMe();
  const CurrentUser = useGetMe();
  const LoggedIn = CurrentUser?.data;
  useEffect(() => {
    if (LoggedIn?.photo) {
      const newPicture = ImageURL + LoggedIn?.photo;
      setProfilePic(newPicture);
    }
  }, [LoggedIn]);

  const fileInput = useRef(null);
  const [profilePics, setProfilePic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const id = user?.id;
  const { uploadProfilePromise } = useUploadProfile(id);

  const handleAvatarClick = () => {
    fileInput.current.click();
  };

  const addFile = async (file) => {
    if (!file) {
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      swal('File is too large (maximum size is 5MB)');
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target?.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfilePic(null);
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      await uploadProfilePromise(formData);
      mutate();
    } catch (error) {
    } finally {
    }
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
          marginLeft: 2,
        }}
      >
        <input
          type="file"
          ref={fileInput}
          style={{ display: 'none' }}
          onChange={(event) => {
            const selectedFile = event.target.files[0];
            addFile(selectedFile);
          }}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={handleAvatarClick}
        >
          {profilePics ? (
            <Avatar src={profilePics} sx={{ width: 80, height: 80 }} />
          ) : (
            <Avatar src={profilePics} sx={{ width: 80, height: 80 }} />
          )}
          <PhotoCamera sx={{ position: 'absolute', bottom: 0, right: 0 }} />
        </IconButton>
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
        <Typography variant="h7" sx={{ mt: 2, mb: 0 }}>
          {data?.fullname}{' '}
        </Typography>
        <Typography sx={{ mb: 0 }} variant="">
          {data?.role || 'N/A'}
        </Typography>
      </Box>
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
        <Typography variant="" sx={{ mt: 2, mb: 0 }}>
          Date of Birth{' '}
        </Typography>
        <Typography sx={{ fontSize: '.8rem', fontWeight: 'bold' }} variant="p">
          {data?.date_of_birth ? <FormattedDate date={data.date_of_birth} /> : 'N/A'}
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
        <Typography variant="" sx={{ mt: 2, mb: 0 }}>
          Gender{' '}
        </Typography>
        <Typography sx={{ fontSize: '.8rem', fontWeight: 'bold' }} variant="p">
          {data?.gender || 'N/A'}
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
    </Card>
  );
}
