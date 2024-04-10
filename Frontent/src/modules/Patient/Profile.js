import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/dashboard/DashboardLayout';
import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import ProfileCard from './components/ProfileCard';
import Iconify from '../../components/iconify/Iconify';
import { successAlert, errorAlert } from '../../utils';
import { LoadingButton } from '@mui/lab';
import { useGetMe, useUpdateMe } from '../Auth/hooks';
import { useIsMutating } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

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

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 15);

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 15);

  const { data } = useGetMe();

  useEffect(() => {
    if (data) {
      const formattedData = {
        ...data,
        date_of_birth: dayjs(data.date_of_birth).format('YYYY-MM-DD'),
      };
      setFormData(formattedData);
    }
  }, [data]);

  const [formData, setFormData] = useState({
    gender: '',
    address: '',
    phone_number: '',
    date_of_birth: '',
    emergency_contact_name: '',
    emergency_contact_gender: '',
    relationship: '',
    emergency_contact_phone: '',
    emergency_contact_address: '',
    emergency_contact_email: '',
    height: '',
    weight: '',
    blood_group: '',
    genotype: '',
    hmo: '',
    nhia_number: '',
  });
  const handleGoBack = () => {
    navigate(-1);
  };

  const handlePhoneInput = (event) => {
    const { name, value } = event.target;
    const phonePattern = /^[0-9]{10}$/;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === 'phone_number' && value.length === 10 && !phonePattern.test(value)) {
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const isLoading = useIsMutating();
  const { mutate, isSuccess, isError, reset, error } = useUpdateMe();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  if (isSuccess) {
    reset();
    successAlert('Profile updated successfully');
  }

  if (isError) {
    reset();
    errorAlert(error);
  }

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
                <ProfileCard data={data} />{' '}
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
              </Tabs>
            </Card>
            {/*----------------------------Tab Panel 1---------------------------------------------*/}
            {/*Today's Consultation*/}
            <TabPanel value={selectedTab} index={0}>
              <Card sx={{ position: 'relative', margin: 3, gap: 4, mb: 1, ml: -2, width: '103%' }}>
                <form onSubmit={handleSubmit}>
                  <Stack
                    spacing={3}
                    sx={{ position: 'relative', margin: 5, gap: 4, ml: 5, width: '90%' }}
                  >
                    <Grid container item xs={9} sm={10} md={11.8} spacing={3}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        variant="outlined"
                        name="fullname"
                        value={formData?.fullname || ''}
                      />
                    </Grid>
                    <Grid container spacing={3} style={{ marginLeft: '-20px', marginTop: '-20px' }}>
                      <Grid item xs={10} sm={10} md={6}>
                        {' '}
                        <TextField
                          value={formData?.email || ''}
                          fullWidth
                          name="email"
                          type="email"
                          label="Email address"
                        />
                      </Grid>

                      <Grid item xs={10} sm={10} md={6}>
                        <TextField
                          type="date"
                          value={formData?.date_of_birth || ''}
                          onChange={handleInputChange}
                          required
                          fullWidth
                          label="Date of Birth"
                          name="date_of_birth"
                          InputProps={{
                            inputProps: {
                              max: maxDate.toISOString().split('T')[0],
                            },
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={3} style={{ marginLeft: '-20px', marginTop: '-20px' }}>
                      <Grid item xs={10} sm={10} md={6}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="gender">Gender</InputLabel>
                          <Select
                            label="Gender"
                            value={formData?.gender || ''}
                            onChange={handleInputChange}
                            inputProps={{
                              name: 'gender',
                              id: 'gender',
                            }}
                          >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={10} sm={10} md={6}>
                        <TextField
                          value={formData?.phone_number || ''}
                          onChange={handlePhoneInput}
                          fullWidth
                          name="phone_number"
                          type="tel"
                          label="Phone Number"
                          inputProps={{ pattern: '[0-9]*' }}
                        />
                      </Grid>
                    </Grid>

                    <Grid container item xs={9} sm={10} md={11.8} spacing={3}>
                      <TextField
                        fullWidth
                        label="Address"
                        variant="outlined"
                        multiline
                        name="address"
                        value={formData?.address || ''}
                        onChange={handleInputChange}
                      />
                    </Grid>
                  </Stack>
                </form>
              </Card>
            </TabPanel>

            {/*----------------------------Tab Panel 2---------------------------------------------*/}
            {/*Today's Consultation*/}

            <TabPanel value={selectedTab} index={1}>
              <Card sx={{ position: 'relative', margin: 3, gap: 4, mb: 1, ml: -2, width: '103%' }}>
                <form onSubmit={handleSubmit}>
                  <Stack
                    spacing={3}
                    sx={{ position: 'relative', margin: 5, gap: 2, ml: 5, width: '90%' }}
                  >
                    {' '}
                    <Grid container item xs={9} sm={10} md={11.8} spacing={3}>
                      <TextField
                        fullWidth
                        label="Emergency Contact Name"
                        variant="outlined"
                        name="emergency_contact_name"
                        value={formData?.emergency_contact_name || ''}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid container spacing={3} style={{ marginLeft: '-20px', marginTop: '-20px' }}>
                      <Grid item container xs={10} sm={10} md={6}>
                        <TextField
                          fullWidth
                          label="Emergency Contact Email"
                          variant="outlined"
                          name="emergency_contact_email"
                          type="email"
                          value={formData?.emergency_contact_email || ''}
                          onChange={handleInputChange}
                        />
                      </Grid>

                      <Grid item container xs={10} sm={10} md={6}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="relationship">Emergency Contact Relation</InputLabel>
                          <Select
                            fullWidth
                            label="Emergency Contact Relation"
                            value={formData?.relationship || ''}
                            onChange={handleInputChange}
                            inputProps={{
                              name: 'relationship',
                              id: 'relationship',
                            }}
                          >
                            {[
                              'Brother',
                              'Sister',
                              'Mother',
                              'Father',
                              'Son',
                              'Daughter',
                              'Aunt',
                              'Uncle',
                            ].map((relationship) => (
                              <MenuItem key={relationship} value={relationship}>
                                {relationship}
                              </MenuItem>
                            ))}
                          </Select>
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
                        <TextField
                          fullWidth
                          label="Emergency Contact Phone"
                          variant="outlined"
                          name="emergency_contact_phone"
                          type="tel"
                          value={formData?.emergency_contact_phone || ''}
                          onChange={handleInputChange}
                        />
                      </Grid>

                      <Grid item container xs={10} sm={10} md={6}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="emergencyGender">
                            Emergency Contact Gender
                          </InputLabel>
                          <Select
                            label="Emergency Contact Gender"
                            value={formData?.emergency_contact_gender || ''}
                            onChange={handleInputChange}
                            inputProps={{
                              name: 'emergency_contact_gender',
                              id: 'emergency_contact_gender',
                            }}
                          >
                            {['Male', 'Female', 'Other'].map((emergency_contact_gender) => (
                              <MenuItem
                                key={emergency_contact_gender}
                                value={emergency_contact_gender}
                              >
                                {emergency_contact_gender}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid container item xs={9} sm={10} md={11.8} spacing={3}>
                      <TextField
                        fullWidth
                        label="Emergency Contact Address"
                        variant="outlined"
                        multiline
                        name="emergency_contact_address"
                        value={formData?.emergency_contact_address || ''}
                        onChange={handleInputChange}
                      />
                    </Grid>
                  </Stack>
                </form>
              </Card>
            </TabPanel>

            {/*----------------------------Tab Panel 3---------------------------------------------*/}
            {/*Today's Consultation*/}

            <TabPanel value={selectedTab} index={2}>
              <Card sx={{ position: 'relative', margin: 3, gap: 4, mb: 1, ml: -2, width: '103%' }}>
                <form onSubmit={handleSubmit}>
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
                        {' '}
                        <TextField
                          required
                          fullWidth
                          label="Height(Inches)"
                          variant="outlined"
                          name="height"
                          value={formData?.height || ''}
                          onChange={handleInputChange}
                        />
                      </Grid>

                      <Grid item container xs={10} sm={10} md={6}>
                        <TextField
                          fullWidth
                          label="Weight(Kg)"
                          variant="outlined"
                          name="weight"
                          value={formData?.weight || ''}
                          onChange={handleInputChange}
                        />
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
                          <InputLabel htmlFor="blood_group">Blood Group</InputLabel>
                          <Select
                            label="Blood Group"
                            value={formData?.blood_group || ''}
                            onChange={handleInputChange}
                            inputProps={{
                              name: 'blood_group',
                              id: 'blood_group',
                            }}
                          >
                            {[
                              'A RhD positive (A+)',
                              'A RhD negative (A-)',
                              'B RhD positive (B+)',
                              'B RhD negative (B-)',
                              'O RhD positive (O+)',
                              'O RhD negative (O-)',
                              'AB RhD positive (AB+)',
                              'AB RhD negative (AB-)',
                            ].map((blood_group) => (
                              <MenuItem key={blood_group} value={blood_group}>
                                {blood_group}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item container xs={10} sm={10} md={6}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="emergencyGender">Genotype</InputLabel>
                          <Select
                            label="Genotype"
                            value={formData?.genotype || ''}
                            onChange={handleInputChange}
                            inputProps={{
                              name: 'genotype',
                              id: 'genotype',
                            }}
                          >
                            <MenuItem value="AA">AA</MenuItem>
                            <MenuItem value="AS">AS</MenuItem>
                            <MenuItem value="AC">AC</MenuItem>
                            <MenuItem value="SS">SS</MenuItem>
                          </Select>
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
                        <TextField
                          fullWidth
                          label="HMO (If any)"
                          variant="outlined"
                          name="hmo"
                          value={formData?.hmo || ''}
                          onChange={handleInputChange}
                        />
                      </Grid>

                      <Grid item container xs={10} sm={10} md={6}>
                        <TextField
                          fullWidth
                          label="NHIA Number (If any)"
                          variant="outlined"
                          name="nhia_number"
                          value={formData?.nhia_number || ''}
                          onChange={handleInputChange}
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
                  onClick={handleSubmit}
                  sx={{ marginRight: 6, marginTop: 1, width: '150px' }}
                  size="medium"
                  type="submit"
                  variant="contained"
                  color="primary"
                  loading={Boolean(isLoading)}
                >
                  Update Profile
                </LoadingButton>
                <Button
                  sx={{ marginRight: 6, marginTop: 1, width: '120px' }}
                  size="medium"
                  type="submit"
                  variant="outlined"
                  color="error"
                  onClick={handleGoBack}
                >
                  Cancel
                </Button>
              </Grid>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Layout>
  );
};

export default Profile;
