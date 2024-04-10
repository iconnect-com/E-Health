import React, { useState } from 'react';
import Layout from '../../layouts/dashboard/DashboardLayout';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  ListItemIcon,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useGetAllUser } from '../Auth/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import UserCard from './components/UserCard';
import Iconify from '../../components/iconify/Iconify';
import { MdMarkEmailRead } from 'react-icons/md';
import { FaLocationDot, FaPhone, FaUser } from 'react-icons/fa6';
import { TbCirclesRelation } from 'react-icons/tb';
import { BsGenderAmbiguous } from 'react-icons/bs';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>{Array.isArray(children) ? children : children ? [children] : null}</Box>
      )}
    </div>
  );
}

const ViewAllUsers = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const { id } = useParams();
  const { data: AllUsers } = useGetAllUser();
  const CurrentUser = AllUsers?.data?.find((user) => user?._id === id);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Layout name="Profile" title="Profile">
      <Container maxWidth="xl">
        <Button
          variant="text"
          onClick={handleGoBack}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          sx={{ mb: 2, marginLeft: 3 }}
        >
          Go Back{' '}
        </Button>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Box sx={{ marginLeft: 3, width: '100%' }}>
            <Card sx={{ position: 'relative', gap: 4 }}>
              <Card sx={{ position: 'relative', borderRadius: 0, margin: 2, boxShadow: 'none' }}>
                <UserCard data={CurrentUser} />{' '}
              </Card>
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                aria-label="Inner tabs"
                variant="fullWidth"
              >
                <Tab label="Account Information" />
              </Tabs>
            </Card>

            <TabPanel value={selectedTab} index={0}>
              <Card sx={{ position: 'relative', margin: 3, gap: 4, mb: 1, ml: -2, width: '103%' }}>
                <form>
                  <Stack
                    spacing={3}
                    sx={{ position: 'relative', margin: 5, gap: 4, ml: 5, width: '80%' }}
                  >
                    <Typography variant="h5">Personal Information</Typography>
                    <Grid container spacing={3} style={{ marginLeft: '-20px', marginTop: '-20px' }}>
                      <Grid item container xs={8} sm={8} md={4}>
                        <ListItemIcon style={{ marginRight: '-1.7rem' }}>
                          <MdMarkEmailRead />
                        </ListItemIcon>
                        <Typography variant="body1">{CurrentUser?.email || ''}</Typography>
                      </Grid>

                      <Grid item container xs={8} sm={8} md={4}>
                        <ListItemIcon style={{ marginRight: '-1.7rem' }}>
                          <FaPhone />
                        </ListItemIcon>
                        <Typography variant="body1">{CurrentUser?.phone_number || ''}</Typography>
                      </Grid>
                      <Grid item container xs={8} sm={8} md={4}>
                        <ListItemIcon style={{ marginRight: '-1.7rem' }}>
                          <FaLocationDot />
                        </ListItemIcon>
                        <Typography variant="body1">{CurrentUser?.address || ''}</Typography>
                      </Grid>
                      <Grid item container xs={8} sm={8} md={4}>
                        <ListItemIcon style={{ marginRight: '-1.7rem' }}>
                          <FaUser />
                        </ListItemIcon>
                        <Typography variant="body1">{CurrentUser?.gender || ''}</Typography>
                      </Grid>
                    </Grid>

                    <Typography variant="h5">Emergency Contact Details</Typography>
                    <Grid container spacing={3} style={{ marginLeft: '-20px', marginTop: '-20px' }}>
                      <Grid item container xs={8} sm={8} md={4}>
                        <ListItemIcon style={{ marginRight: '-1.7rem' }}>
                          <FaUser />
                        </ListItemIcon>
                        <Typography variant="body1">
                          {CurrentUser?.emergency_contact_name || ''}
                        </Typography>
                      </Grid>

                      <Grid item container xs={8} sm={8} md={4}>
                        <ListItemIcon style={{ marginRight: '-1.7rem' }}>
                          <FaPhone />
                        </ListItemIcon>
                        <Typography variant="body1">
                          {CurrentUser?.emergency_contact_phone || ''}
                        </Typography>
                      </Grid>

                      <Grid item container xs={8} sm={8} md={4}>
                        <ListItemIcon style={{ marginRight: '-1.7rem' }}>
                          <TbCirclesRelation />
                        </ListItemIcon>
                        <Typography variant="body1">{CurrentUser?.relationship || ''}</Typography>
                      </Grid>

                      <Grid item container xs={8} sm={8} md={4}>
                        <ListItemIcon style={{ marginRight: '-1.7rem' }}>
                          <BsGenderAmbiguous />
                        </ListItemIcon>
                        <Typography variant="body1">
                          {CurrentUser?.emergency_contact_gender || ''}
                        </Typography>
                      </Grid>

                      <Grid item container xs={8} sm={8} md={4}>
                        <ListItemIcon style={{ marginRight: '-1.7rem' }}>
                          <FaLocationDot />
                        </ListItemIcon>
                        <Typography variant="body1">
                          {CurrentUser?.emergency_contact_address || ''}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Typography variant="h5">Medical Information</Typography>
                    <Grid container spacing={3} style={{ marginLeft: '-20px', marginTop: '-40px' }}>
                      <Grid direction="column" item container xs={8} sm={8} md={4}>
                        <Typography variant="" sx={{ mt: 2, mb: 0 }}>
                          Height{' '}
                        </Typography>
                        <Typography sx={{ fontSize: '.8rem', fontWeight: 'bold' }} variant="p">
                          {CurrentUser?.height || ''}
                        </Typography>
                      </Grid>

                      <Grid direction="column" item container xs={8} sm={8} md={4}>
                        <Typography variant="" sx={{ mt: 2, mb: 0 }}>
                          Weight{' '}
                        </Typography>
                        <Typography sx={{ fontSize: '.8rem', fontWeight: 'bold' }} variant="p">
                          {CurrentUser?.weight || ''}
                        </Typography>
                      </Grid>

                      <Grid direction="column" item container xs={8} sm={8} md={4}>
                        <Typography variant="" sx={{ mt: 2, mb: 0 }}>
                          Blood Group{' '}
                        </Typography>
                        <Typography sx={{ fontSize: '.8rem', fontWeight: 'bold' }} variant="p">
                          {CurrentUser?.blood_group || ''}
                        </Typography>
                      </Grid>

                      <Grid direction="column" item container xs={8} sm={8} md={4}>
                        <Typography variant="" sx={{ mt: 2, mb: 0 }}>
                          Genotype{' '}
                        </Typography>
                        <Typography sx={{ fontSize: '.8rem', fontWeight: 'bold' }} variant="p">
                          {CurrentUser?.genotype || ''}
                        </Typography>
                      </Grid>

                      <Grid direction="column" item container xs={8} sm={8} md={4}>
                        <Typography variant="" sx={{ mt: 2, mb: 0 }}>
                          HMO{' '}
                        </Typography>
                        <Typography sx={{ fontSize: '.8rem', fontWeight: 'bold' }} variant="p">
                          {CurrentUser?.hmo || ''}
                        </Typography>
                      </Grid>

                      <Grid direction="column" item container xs={8} sm={8} md={4}>
                        <Typography variant="" sx={{ mt: 2, mb: 0 }}>
                          NHIA Number{' '}
                        </Typography>
                        <Typography sx={{ fontSize: '.8rem', fontWeight: 'bold' }} variant="p">
                          {CurrentUser?.nhia_number || ''}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Stack>
                </form>
              </Card>
            </TabPanel>
          </Box>
        </Stack>
      </Container>
    </Layout>
  );
};

export default ViewAllUsers;
