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
  Typography,
} from '@mui/material';
import Iconify from '../../components/iconify/Iconify';
import { successAlert, errorAlert } from '../../utils';
import { LoadingButton } from '@mui/lab';
import { useGetMe, useUpdateMe } from '../Auth/hooks';
import { useIsMutating } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../Patient/components/ProfileCard';
import swal from 'sweetalert';
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

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
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
    specialization: '',
    yearsOfExperience: '',
    portfolio: '',
    education: '',
    certifications: '',
    awards: '',
    publications: '',
    license: null,
    available_day: '',

    // Dayfrom, DayTo, Timefrom, TimeTo
    // I'm using dayTo for start time and timeTo for end time as these are the only enums returning the data i need
    dayTo: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
    timeTo: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  const addFile = (file) => {
    if (!file) {
      swal('Please select a file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      swal('File is too large (maximum size is 5MB)');
      return;
    }

    setLoading(true);

    const fileURL = ['/uploads/' + file.name];

    setFormData((prevFormData) => ({
      ...prevFormData,
      license: fileURL,
    }));

    setFile(file);
    setLoading(false);
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
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== 'license') {
        data.append(key, formData[key]);
      }
    });

    if (file) {
      data.append('license', file);
    }

    mutate(data);
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
                <Tab label="Professional Information" />
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
                      <Grid item container xs={10} sm={10} md={6}>
                        {' '}
                        <TextField
                          value={formData?.email || ''}
                          fullWidth
                          name="email"
                          type="email"
                          label="Email address"
                        />
                      </Grid>

                      <Grid item container xs={10} sm={10} md={6}>
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
                            {['Male', 'Female', 'Other'].map((gender) => (
                              <MenuItem key={gender} value={gender}>
                                {gender}
                              </MenuItem>
                            ))}
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

            {/*----------------------------Tab Panel 4---------------------------------------------*/}
            {/*Professional Info*/}

            <TabPanel value={selectedTab} index={3}>
              <Card sx={{ position: 'relative', margin: 3, gap: 4, mb: 1, ml: -2, width: '103%' }}>
                <form onSubmit={handleSubmit}>
                  <Stack
                    spacing={3}
                    sx={{ position: 'relative', margin: 6, gap: 4, ml: 6, width: '90%' }}
                  >
                    {' '}
                    <Grid
                      container
                      item
                      spacing={3}
                      style={{ marginLeft: '-20px', marginTop: '-20px' }}
                    >
                      <Grid item container xs={8} sm={8} md={6}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="Specialization">Specialization</InputLabel>
                          <Select
                            label="Specialization"
                            multiple
                            value={
                              formData &&
                              formData.specialization &&
                              formData.specialization.length > 0
                                ? formData.specialization.split(', ')
                                : []
                            }
                            onChange={(event) => {
                              setFormData({
                                ...formData,
                                specialization: event.target.value.join(', '),
                              });
                            }}
                            inputProps={{
                              name: 'specialization',
                              id: 'specialization',
                            }}
                            renderValue={(selected) => selected.join(', ')}
                          >
                            {[
                              'General Practice',
                              'Internal Medicine',
                              'Pediatrics',
                              'Family Medicine',
                              'Obstetrics and Gynecology',
                              'Psychiatry',
                              'Anesthesiology',
                              'Neurology',
                              'Cardiology',
                              'Oncology',
                              'Radiology',
                              'Orthopedic Surgery',
                              'Dermatology',
                              'Ophthalmology',
                              'Pathology',
                              'Urology',
                              'Gastroenterology',
                              'Endocrinology',
                              'Pulmonology',
                              'Nephrology',
                              'Rheumatology',
                              'Allergy and Immunology',
                              'Infectious Disease',
                              'Plastic Surgery',
                              'Otolaryngology',
                              'Other',
                            ].map((specialty) => (
                              <MenuItem value={specialty} key={specialty}>
                                {specialty}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item container xs={8} sm={8} md={6}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="Years Of Experience">Years Of Experience</InputLabel>
                          <Select
                            label="Years Of Experience"
                            value={formData?.yearsOfExperience || ''}
                            onChange={handleInputChange}
                            inputProps={{
                              name: 'yearsOfExperience',
                              id: 'yearsOfExperience',
                            }}
                          >
                            {[
                              '3 Years',
                              '4 Years',
                              '5 Years',
                              '6 Years',
                              '7 Years',
                              '8 Years',
                              '9 Years',
                              '10 Years',
                              '10 Years +',
                            ].map((experience) => (
                              <MenuItem key={experience} value={experience}>
                                {experience}
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
                      <Grid item container xs={8} sm={8} md={6}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="certifications">Certifications</InputLabel>
                          <Select
                            label="Specialization"
                            value={formData?.certifications || ''}
                            onChange={handleInputChange}
                            inputProps={{
                              name: 'certifications',
                              id: 'certifications',
                            }}
                          >
                            {[
                              'Board Certified',
                              'Fellowship Trained',
                              'Advanced Cardiac Life Support',
                              'Pediatric Advanced Life Support',
                              'Advanced Trauma Life Support',
                              'Certified Medical Examiner',
                              'Other',
                            ].map((certifications) => (
                              <MenuItem key={certifications} value={certifications}>
                                {certifications}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item container xs={8} sm={8} md={6}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="awards">Awards Recieved</InputLabel>
                          <Select
                            label="awards"
                            value={formData?.awards || ''}
                            onChange={handleInputChange}
                            inputProps={{
                              name: 'awards',
                              id: 'awards',
                            }}
                          >
                            {[
                              'Physician of the Year',
                              'Lifetime Achievement Award',
                              'Healthcare Heroes Award',
                              "Patient's Choice Award",
                              'Top Doctor Award',
                              'None for now',
                            ].map((awards) => (
                              <MenuItem key={awards} value={awards}>
                                {awards}
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
                      <Grid item container xs={8} sm={8} md={6}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="Available Days">Available Days</InputLabel>
                          <Select
                            label="Available Days"
                            multiple
                            value={formData?.publications ? formData.publications.split(', ') : []}
                            onChange={(event) => {
                              const daysOfWeek = [
                                'Mondays',
                                'Tuesdays',
                                'Wednesdays',
                                'Thursdays',
                                'Fridays',
                                'Saturdays',
                                'Sundays',
                              ];
                              const sortedDays = event.target.value.sort(
                                (a, b) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b)
                              );
                              setFormData({
                                ...formData,
                                publications: sortedDays.join(', '),
                              });
                            }}
                            inputProps={{
                              name: 'publications',
                              id: 'publications',
                            }}
                            renderValue={(selected) => selected.join(', ')}
                          >
                            {[
                              'Mondays',
                              'Tuesdays',
                              'Wednesdays',
                              'Thursdays',
                              'Fridays',
                              'Saturdays',
                              'Sundays',
                            ].map((day) => (
                              <MenuItem key={day} value={day}>
                                {day}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item container xs={8} sm={8} md={6} spacing={2}>
                        <Grid item xs={10} sm={10} md={6}>
                          <TextField
                            type="time"
                            name="dayTo"
                            value={formData?.dayTo}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            label="Time from"
                          />
                        </Grid>
                        <Grid item xs={10} sm={10} md={6}>
                          <TextField
                            type="time"
                            name="timeTo"
                            value={formData?.timeTo}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            label="Time to"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      item
                      spacing={3}
                      style={{ marginLeft: '-20px', marginTop: '-20px' }}
                    >
                      <Grid item container xs={8} sm={8} md={6}>
                        <TextField
                          fullWidth
                          label="Portfolio (A brief details of your work experience)"
                          variant="outlined"
                          name="portfolio"
                          value={formData?.portfolio || ''}
                          onChange={handleInputChange}
                          multiline
                          rows={6}
                        />
                      </Grid>

                      {!formData?.license && (
                        <Grid item container xs={8} sm={8} md={5}>
                          <TextField
                            variant="outlined"
                            required
                            type="file"
                            accept=".png, .jpg, .jpeg, .pdf"
                            onChange={(e) => {
                              const selectedFile = e.target.files[0];
                              addFile(selectedFile);
                            }}
                          />
                          <InputLabel htmlFor="Doctor's License">Doctor's License</InputLabel>
                          <Typography
                            variant="body2"
                            style={{ fontWeight: 'bold', fontSize: '0.8rem' }}
                          >
                            INFO: Add a supporting document, like doctor's license. Pdf, PNG, JPEG,
                            JPG format, and be aware you can only upload once, after which this
                            upload box will disappear
                          </Typography>
                        </Grid>
                      )}
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
