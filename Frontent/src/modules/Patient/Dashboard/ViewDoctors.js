import React, { useState } from 'react';
import Layout from '../../../layouts/dashboard/DashboardLayout';
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
import { useLocation, useNavigate } from 'react-router-dom';
import { ImageURL } from '../../../axios-Instance/constants';
import Iconify from '../../../components/iconify';
import UserCardDoc from '../components/UserCardDoc';
import PDF from '../../../assets/pdf-icon.png';
import { FaAward, FaCertificate, FaLocationDot, FaPhone } from 'react-icons/fa6';
import { FaHistory } from 'react-icons/fa';
import { MdMarkEmailRead } from 'react-icons/md';
import { HiOutlineCalendarDays } from 'react-icons/hi2';
import { BiSolidTimeFive } from 'react-icons/bi';

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
  const location = useLocation();
  const CurrentUser = location.state?.group;

  const handleGoBack = () => {
    navigate(-1);
  };

  function convertTo12HourFormat(time) {
    const [hour, minute] = time.split(':');
    const hourIn12HourFormat = hour % 12 || 12;
    const period = hour >= 12 ? 'PM' : 'AM';
    return `${hourIn12HourFormat}:${minute} ${period}`;
  }

  const licences = CurrentUser?.license ? ImageURL + CurrentUser?.license[0] : null;

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
                <UserCardDoc data={CurrentUser} />{' '}
              </Card>
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                aria-label="Inner tabs"
                variant="fullWidth"
              >
                <Tab label="Doctor's Information" />
              </Tabs>
            </Card>

            <TabPanel value={selectedTab} index={0}>
              <Card sx={{ position: 'relative', margin: 0, gap: 4, mb: 1, ml: -2, width: '103%' }}>
                <form>
                  <Stack
                    spacing={3}
                    sx={{ position: 'relative', margin: 5, gap: 4, ml: 5, width: '90%' }}
                  >
                    <Typography variant="h5">Professional Details</Typography>
                    <Grid container spacing={3} style={{ marginLeft: '-20px', marginTop: '-20px' }}>
                      <Grid item container xs={8} sm={8} md={4}>
                        <ListItemIcon style={{ marginRight: '-1.7rem' }}>
                          <MdMarkEmailRead />
                        </ListItemIcon>
                        <Typography variant="body1">{CurrentUser.email || ''}</Typography>
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
                    </Grid>

                    <Grid container spacing={3} style={{ marginLeft: '-20px', marginTop: '-20px' }}>
                      <Grid item container xs={8} sm={8} md={4}>
                        <ListItemIcon style={{ marginRight: '-1.7rem' }}>
                          <FaHistory />
                        </ListItemIcon>
                        <Typography variant="body1">
                          {CurrentUser.yearsOfExperience || ''} of experience
                        </Typography>
                      </Grid>

                      <Grid item container xs={8} sm={8} md={4}>
                        <ListItemIcon style={{ marginRight: '-1.7rem' }}>
                          <FaAward />
                        </ListItemIcon>
                        <Typography variant="body1">{CurrentUser?.awards}</Typography>
                      </Grid>
                      <Grid item container xs={8} sm={8} md={4}>
                        <ListItemIcon style={{ marginRight: '-1.7rem' }}>
                          <FaCertificate />
                        </ListItemIcon>
                        <Typography variant="body1">{CurrentUser?.certifications || ''}</Typography>
                      </Grid>
                    </Grid>

                    <Typography variant="h5">Availability</Typography>
                    <Grid
                      container
                      item
                      spacing={3}
                      style={{ marginLeft: '-20px', marginTop: '-30px' }}
                    >
                      <Grid item container xs={8} sm={8} md={4}>
                        <ListItemIcon style={{ marginRight: '-1.7rem' }}>
                          <HiOutlineCalendarDays />
                        </ListItemIcon>
                        <Typography variant="body1">{CurrentUser?.publications || ''}</Typography>
                      </Grid>

                      <Grid item container xs={8} sm={8} md={4}>
                        <ListItemIcon style={{ marginRight: '-1.7rem' }}>
                          <BiSolidTimeFive />{' '}
                        </ListItemIcon>
                        <Typography variant="body1">
                          {convertTo12HourFormat(CurrentUser?.dayTo || '')} to{' '}
                          {convertTo12HourFormat(CurrentUser?.timeTo || '')}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid item direction="column" container xs={8} sm={8} md={12} spacing={3}>
                      <Typography variant="h5">A little bit about myself</Typography>

                      <Typography variant="body1">{CurrentUser?.portfolio || ''}</Typography>
                    </Grid>

                    <Grid item direction="column" container xs={8} sm={8} md={10} spacing={3}>
                      <Typography variant="h7" sx={{ mt: -2, mb: 0 }}>
                        Doctor's License{' '}
                      </Typography>
                      <Typography sx={{ mb: 0 }} variant="">
                        {CurrentUser?.license && CurrentUser.license.length > 0 ? (
                          <Typography sx={{ mb: 0 }} variant="">
                            <a
                              href={`https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(
                                licences
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                alt="images"
                                src={PDF}
                                style={{ width: '50px', height: '50px' }}
                              />
                            </a>
                          </Typography>
                        ) : null}
                      </Typography>
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
