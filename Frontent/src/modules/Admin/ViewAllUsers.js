import React, { useState } from 'react';
import Layout from '../../layouts/dashboard/DashboardLayout';
import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Iconify from '../../components/iconify';
import { LoadingButton } from '@mui/lab';
import { useDeleteUser, useGetAllUser } from '../Auth/hooks';
import { errLoginAlert, errorAlert, successAlert } from '../../utils';
import { useIsMutating } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import UserCard from './components/UserCard';
import { ImageURL } from '../../axios-Instance/constants';
import PDF from '../../assets/pdf-icon.png';

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
  const [openSuccess, setOpenSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isLoading = useIsMutating();
  const { mutate, isError, reset, error } = useDeleteUser(CurrentUser?._id);

  if (isError) {
    reset();
    errorAlert(error);
  }

  const handleYes = (e) => {
    e.preventDefault();

    if (CurrentUser?.role === 'Admin') {
      errLoginAlert(`User (${CurrentUser?.fullname}) cannot be removed as an Admin.`);
    } else {
      mutate(CurrentUser?._id);
      setOpen(false);
      setOpenSuccess(true);
    }
  };

  const handleOk = () => {
    setOpenSuccess(false);
    successAlert(`User (${CurrentUser?.fullname}) deleted successfully.`);
    reset();
    navigate('/');
  };

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
                <UserCard data={CurrentUser} />{' '}
              </Card>
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                aria-label="Inner tabs"
                variant="fullWidth"
              >
                <Tab label="Account Information" />
                <Tab label="Contact Information" />
                <Tab label="Medical Information" />
                {CurrentUser?.role === 'Doctor' && <Tab label="Professional Information" />}{' '}
              </Tabs>
            </Card>
            {/*----------------------------Tab Panel 1---------------------------------------------*/}
            {/*Today's Consultation*/}
            <TabPanel value={selectedTab} index={0}>
              <Card sx={{ position: 'relative', margin: 3, gap: 4, mb: 1, ml: -2, width: '103%' }}>
                <form>
                  <Stack
                    spacing={3}
                    sx={{ position: 'relative', margin: 5, gap: 4, ml: 5, width: '90%' }}
                  >
                    <Grid container spacing={3} style={{ marginLeft: '-20px', marginTop: '-20px' }}>
                      <Grid item container xs={10} sm={10} md={6}>
                        {' '}
                        <TextField
                          value={CurrentUser?.email || ''}
                          fullWidth
                          readOnly
                          name="email"
                          type="email"
                          label="Email address"
                        />
                      </Grid>

                      <Grid item container xs={10} sm={10} md={6}>
                        <TextField
                          value={
                            (CurrentUser && CurrentUser.date_of_birth
                              ? new Date(CurrentUser?.date_of_birth).toLocaleDateString('en-GB', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                })
                              : '') || ''
                          }
                          readOnly
                          fullWidth
                          name="date_of_birth"
                          label="Date of Birth"
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={3} style={{ marginLeft: '-20px', marginTop: '-20px' }}>
                      <Grid item container xs={10} sm={10} md={6}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="gender"></InputLabel>
                          <TextField
                            label="Gender"
                            value={CurrentUser?.gender || ''}
                            readOnly
                          ></TextField>
                        </FormControl>
                      </Grid>

                      <Grid item container xs={10} sm={10} md={6}>
                        <TextField
                          value={CurrentUser?.phone_number || ''}
                          readOnly
                          fullWidth
                          name="phone"
                          label="Phone Number"
                        />
                      </Grid>
                    </Grid>

                    <Grid item container xs={10} sm={10} md={12} spacing={3}>
                      <TextField
                        fullWidth
                        label="Address"
                        variant="outlined"
                        multiline
                        name="address"
                        value={CurrentUser?.address || ''}
                        readOnly
                      />
                    </Grid>
                    <Grid item container xs={10} sm={8} md={10} spacing={3}>
                      <Box
                        sx={{
                          alignItems: 'center',
                          mx: 1,
                          gap: 0,
                          borderRadius: 0,
                          borderColor: 'divider',
                        }}
                      >
                        {CurrentUser?.license && CurrentUser.license.length > 0 ? (
                          <>
                            <Typography variant="h7" sx={{ mt: 2, mb: 0 }}>
                              Doctor's License{' '}
                            </Typography>
                            <Typography sx={{ mb: 0 }} variant="">
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
                            </Typography>
                          </>
                        ) : null}
                      </Box>
                    </Grid>
                  </Stack>
                </form>
              </Card>
            </TabPanel>

            {/*----------------------------Tab Panel 2---------------------------------------------*/}

            <TabPanel value={selectedTab} index={1}>
              <Card sx={{ position: 'relative', margin: 3, gap: 4, mb: 1, ml: -2, width: '103%' }}>
                <form>
                  <Stack
                    spacing={3}
                    sx={{ position: 'relative', margin: 5, gap: 4, ml: 5, width: '90%' }}
                  >
                    {' '}
                    <Grid container spacing={3} style={{ marginLeft: '-20px', marginTop: '-20px' }}>
                      <Grid item container xs={10} sm={10} md={6}>
                        <TextField
                          fullWidth
                          label="Emergency Contact Name"
                          variant="outlined"
                          name="emergency_contact_name"
                          value={CurrentUser?.emergency_contact_name || ''}
                          readOnly
                        />
                      </Grid>
                      <Grid item container xs={10} sm={10} md={6}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="emergencyGender"></InputLabel>
                          <TextField
                            label="Emergency Contact Gender"
                            value={CurrentUser?.emergency_contact_gender || ''}
                            readOnly
                            inputProps={{
                              name: 'emergency_contact_gender',
                              id: 'emergency_contact_gender',
                            }}
                          ></TextField>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3} style={{ marginLeft: '-20px', marginTop: '-20px' }}>
                      <Grid item container xs={10} sm={10} md={6}>
                        <TextField
                          fullWidth
                          label="Emergency Contact Email"
                          variant="outlined"
                          name="emergency_contact_email"
                          type="email"
                          value={CurrentUser?.emergency_contact_email || ''}
                          readOnly
                        />
                      </Grid>

                      <Grid item container xs={10} sm={10} md={6}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="relationship"></InputLabel>
                          <TextField
                            fullWidth
                            label="Emergency Contact Relation"
                            value={CurrentUser?.relationship || ''}
                            readOnly
                          ></TextField>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3} style={{ marginLeft: '-20px', marginTop: '-20px' }}>
                      <Grid item container xs={10} sm={10} md={6}>
                        <TextField
                          fullWidth
                          label="Emergency Contact Phone"
                          variant="outlined"
                          name="emergency_contact_phone"
                          type="tel"
                          value={CurrentUser?.emergency_contact_phone || ''}
                          readOnly
                        />
                      </Grid>

                      <Grid item container xs={10} sm={10} md={6}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="emergencyGender"></InputLabel>
                          <TextField
                            label="Emergency Contact Gender"
                            value={CurrentUser?.emergency_contact_gender || ''}
                            readOnly
                            inputProps={{
                              name: 'emergency_contact_gender',
                              id: 'emergency_contact_gender',
                            }}
                          ></TextField>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Stack>
                </form>
              </Card>
            </TabPanel>

            {/*----------------------------Tab Panel 3---------------------------------------------*/}
            {/*Today's Consultation*/}

            <TabPanel value={selectedTab} index={2}>
              <Card sx={{ position: 'relative', margin: 3, gap: 4, mb: 1, ml: -2, width: '103%' }}>
                <form>
                  <Stack
                    spacing={3}
                    sx={{ position: 'relative', margin: 5, gap: 4, ml: 5, width: '90%' }}
                  >
                    {' '}
                    <Grid container spacing={3} style={{ marginLeft: '-20px', marginTop: '-20px' }}>
                      <Grid item container xs={10} sm={10} md={6}>
                        {' '}
                        <TextField
                          required
                          fullWidth
                          label="Height(Inches)"
                          variant="outlined"
                          name="height"
                          value={CurrentUser?.height || ''}
                          readOnly
                        />
                      </Grid>

                      <Grid item container xs={10} sm={10} md={6}>
                        <TextField
                          fullWidth
                          label="Weight(Kg)"
                          variant="outlined"
                          name="weight"
                          value={CurrentUser?.weight || ''}
                          readOnly
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={3} style={{ marginLeft: '-20px', marginTop: '-20px' }}>
                      <Grid item container xs={10} sm={10} md={6}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="blood_group"></InputLabel>
                          <TextField
                            label="Blood Group"
                            readOnly
                            value={CurrentUser?.blood_group || ''}
                          ></TextField>
                        </FormControl>
                      </Grid>

                      <Grid item container xs={10} sm={10} md={6}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="emergencyGender"></InputLabel>
                          <TextField
                            label="Genotype"
                            value={CurrentUser?.genotype || ''}
                            readOnly
                          ></TextField>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3} style={{ marginLeft: '-20px', marginTop: '-20px' }}>
                      <Grid item container xs={10} sm={10} md={6}>
                        <TextField
                          fullWidth
                          label="HMO (If any)"
                          variant="outlined"
                          name="hmo"
                          value={CurrentUser?.hmo || ''}
                          readOnly
                        />
                      </Grid>

                      <Grid item container xs={10} sm={10} md={6}>
                        <TextField
                          fullWidth
                          label="NHIA Number (If any)"
                          variant="outlined"
                          name="nhia_number"
                          value={CurrentUser?.nhia_number || ''}
                          readOnly
                        />
                      </Grid>
                    </Grid>
                  </Stack>
                </form>
              </Card>
            </TabPanel>

            {/*----------------------------Tab Panel 4---------------------------------------------*/}
            {/*Professional Info*/}

            <TabPanel value={selectedTab} index={3}>
              <Card sx={{ position: 'relative', margin: 3, gap: 4, mb: 1, ml: -2, width: '103%' }}>
                <form>
                  <Stack
                    spacing={3}
                    sx={{ position: 'relative', margin: 5, gap: 4, ml: 5, width: '90%' }}
                  >
                    {' '}
                    <Grid
                      container
                      item
                      spacing={3}
                      style={{ marginLeft: '-20px', marginTop: '-20px' }}
                    >
                      <Grid item container xs={10} sm={10} md={6}>
                        <FormControl fullWidth>
                          <TextField
                            label="Specialization"
                            value={CurrentUser?.specialization || ''}
                            readOnly
                          ></TextField>
                        </FormControl>
                      </Grid>

                      <Grid item container xs={10} sm={10} md={6}>
                        <FormControl fullWidth>
                          <TextField
                            label="Years Of Experience"
                            value={CurrentUser?.yearsOfExperience || ''}
                            readOnly
                          ></TextField>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      item
                      spacing={3}
                      style={{ marginLeft: '-20px', marginTop: '-20px' }}
                    >
                      <Grid item container xs={10} sm={10} md={6}>
                        <FormControl fullWidth>
                          <TextField
                            label="Certifications"
                            value={CurrentUser?.certifications || ''}
                            readOnly
                          ></TextField>
                        </FormControl>
                      </Grid>

                      <Grid item container xs={10} sm={10} md={6}>
                        <FormControl fullWidth>
                          <TextField
                            label="Awards"
                            value={CurrentUser?.awards || ''}
                            readOnly
                          ></TextField>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      item
                      spacing={3}
                      style={{ marginLeft: '-20px', marginTop: '-20px' }}
                    >
                      <Grid item container xs={10} sm={10} md={12}>
                        <TextField
                          fullWidth
                          label="Portfolio"
                          variant="outlined"
                          name="portfolio"
                          value={CurrentUser?.portfolio || ''}
                          multiline
                          rows={10}
                        />
                      </Grid>
                    </Grid>
                  </Stack>
                </form>
              </Card>
            </TabPanel>
            <Box
              sx={{
                alignItems: 'left',
                mx: 2,
                borderRadius: 0,
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'row',
                marginLeft: 5,
              }}
            >
              <Grid container sx={{ my: 2 }} spacing={3}>
                <LoadingButton
                  onClick={handleClickOpen}
                  sx={{ marginRight: 6, marginTop: 1, width: '150px' }}
                  size="medium"
                  type="submit"
                  variant="contained"
                  color="error"
                  loading={Boolean(isLoading)}
                >
                  Delete User
                </LoadingButton>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>{'Are you sure?'}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>{`Do you want to remove (${CurrentUser?.fullname})?`}</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleYes} autoFocus>
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog open={openSuccess} onClose={handleOk}>
                  <DialogTitle>
                    <CheckCircleIcon color="success" /> {'Success!'}
                  </DialogTitle>{' '}
                  <DialogContent>
                    <DialogContentText>{` (${CurrentUser?.fullname}) remove successfully`}</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleOk} autoFocus>
                      OK
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Layout>
  );
};

export default ViewAllUsers;
