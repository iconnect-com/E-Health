import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DateCalendarServerRequest from './../../../components/DatePicker';
import Layout from '../../../layouts/dashboard/DashboardLayout';
import { useAddAppointment, useGetallAppointment } from '../Hooks';
import { AuthContext } from '../../../context';
import { useState } from 'react';
import {
  Stack,
  Container,
  Typography,
  FormControl,
  MenuItem,
  InputLabel,
  Grid,
  Select,
  TextField,
  Button,
  List,
  ListItem,
  Card,
} from '@mui/material';
import Iconify from '../../../components/iconify';
import { useGetDocList } from '../../Auth/hooks';
import { useIsMutating } from '@tanstack/react-query';
import { errorAlert, paymentAlert } from '../../../utils';
import { LoadingButton } from '@mui/lab';
import { format } from 'date-fns';
import swal from 'sweetalert';
import { useGetAppType } from '../../Admin/hooks';
import Paystack from './../../../components/Paystack';

function convertTo12HourFormat(time) {
  const [hour, minute] = time.split(':');
  const hourIn12HourFormat = hour % 12 || 12;
  const period = hour >= 12 ? 'PM' : 'AM';
  return `${hourIn12HourFormat}:${minute} ${period}`;
}
export function AppointmentList({ appappointments }) {
  const dates = Object.keys(appappointments);

  return (
    <List>
      {dates.map((date) => (
        <ListItem key={date}>
          <Typography variant="h7">
            {new Date(date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Typography>
          {appappointments[date].map((time, index) => (
            <Typography key={index}>{convertTo12HourFormat(time)}</Typography>
          ))}
        </ListItem>
      ))}
    </List>
  );
}

const Appointments = ({ propId, res }) => {
  const { user } = useContext(AuthContext);
  const handleGoBack = () => {
    navigate(-1);
  };
  const { data: AppsTypes } = useGetAppType();
  const { getDoctorName: SeeDods } = useGetDocList();
  const AppointmentData = useGetallAppointment();
  const mappedTypes = AppsTypes?.map((item, index) => ({
    ...item,
    index: AppsTypes?.length - index - 1,
  }));

  useEffect(() => {
    paymentAlert('Please do not refresh this page to avoid disrupting the payment process');
  }, []);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    appointment_type: '',
    appointment_date: new Date().toISOString().split('T')[0],
    appointment_time: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
    doctor: '',
    symptoms: '',
    current_medication: '',
    medical_report: null,
    period: '',

    // is_paid: '',
    // payment_date: '',
    // payment_status: '',
    // payment_reference: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    const selectedType = mappedTypes.find((type) => type._id === value);
    setAppointmentPrice(selectedType.price);
    setAppointmentId(selectedType.name);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDoctorList = (e) => {
    const { name, value } = e.target;
    setSelectedDoctorAppappointments([]);
    setSelectedDoctorAppoints([]);
    setSelectedDoc([]);
    setAvailableDays([]);

    // Doctor's Appointment Dates
    const appointmentTDoc =
      AppointmentData?.data?.filter(
        (appointment) => appointment?.doctor?._id === value && appointment?.status === 'Confirmed'
      ) || [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const docAppointmentDatess =
      appointmentTDoc
        .map((appointment) => appointment?.appointment_date)
        .filter((date) => new Date(date) >= today) || [];
    const DocCalendar = docAppointmentDatess?.map((date) => format(new Date(date), 'MM-dd-yyyy'));

    // Doctor's Appointment Times
    const appointmentTimeDoc =
      AppointmentData?.data?.filter(
        (appointment) => appointment?.doctor?._id === value && appointment?.status !== 'Rejected'
      ) || [];

    const futureAppappointments = appointmentTimeDoc.filter((appointment) => {
      const date = new Date(appointment.appointment_date.split('T')[0]);
      return date >= today;
    });

    const groupedAppappointments = futureAppappointments.reduce((acc, appointment) => {
      const date = appointment.appointment_date.split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(appointment.appointment_time);
      return acc;
    }, {});

    const selectedDoc = SeeDods?.find((u) => u?._id === value);
    if (!selectedDoc || !selectedDoc.publications) {
      swal(
        "The doctor is yet to set their available days, you won't be able to proceed with them."
      );

      return;
    }

    setFormData({ ...formData, [name]: value });

    const availableDays = selectedDoc?.publications.split(', ');

    setAvailableDays(availableDays);

    // Map the days of the week to their corresponding numbers
    const daysOfWeek = [
      'Sundays',
      'Mondays',
      'Tuesdays',
      'Wednesdays',
      'Thursdays',
      'Fridays',
      'Saturdays',
    ];

    // Filter the doctor's calendar to only include the available days
    const filteredCalendar = Object.keys(groupedAppappointments).filter((date) => {
      const dayOfWeek = new Date(date).getDay();
      return availableDays.includes(daysOfWeek[dayOfWeek]);
    });

    // Filter the doctor's calendar to only include the available times
    const filteredAppappointments = {};
    const [startHours, startMinutes] = selectedDoc?.dayTo.split(':').map(Number);
    const [endHours, endMinutes] = selectedDoc?.timeTo.split(':').map(Number);
    for (const date of filteredCalendar) {
      filteredAppappointments[date] = groupedAppappointments[date].filter((time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return (
          (hours > startHours || (hours === startHours && minutes >= startMinutes)) &&
          (hours < endHours || (hours === endHours && minutes <= endMinutes))
        );
      });
    }

    setSelectedDoctorAppappointments(DocCalendar);
    setGroupedAppappointments(filteredAppappointments);
    setPreviousAppointment(groupedAppappointments);
    setSelectedDoctorAppoints(groupedAppappointments);
    setSelectedDoc(selectedDoc);
  };

  const isLoading = useIsMutating();
  const { mutate, isError, reset, error } = useAddAppointment({
    onSuccess: () => {
      navigate('/');
    },
  });

  const [selectedDoctorAppappointments, setSelectedDoctorAppappointments] = useState([]);
  const [selectedDoctorAppoints, setSelectedDoctorAppoints] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState({});
  const [availableDays, setAvailableDays] = useState([]);
  const [groupedAppappointments, setGroupedAppappointments] = useState({});
  const [previousAppointment, setPreviousAppointment] = useState({});
  const [appointmentPrice, setAppointmentPrice] = useState('Select an appointment type');
  const [appointmentId, setAppointmentId] = useState();
  const [paystackRef, setPaystackRef] = useState('');

  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const [OpenStack, setOpenStack] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const addFile = (file) => {
    if (!file) {
      swal('Please select a picture');
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
      medical_report: fileURL,
      user: user._id,
    }));

    setFile(file);
    setLoading(false);
  };

  const handlePaymentSuccess = (reference) => {
    setIsPaymentSuccessful(true);
    setPaystackRef(reference);
    setOpenStack(false);
    handleSubmit();
  };

  const handleOpen = () => {
    if (validateAppointment()) {
      setOpenStack(true);
    } else {
      setOpenStack(false);
    }
  };

  const handleClose = () => {
    setOpenStack(false);
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value !== '');
  };

  const validateAppointment = () => {
    const selectedDate = format(new Date(formData.appointment_date), 'yyyy-MM-dd');
    const selectedDayOfWeek = new Date(formData.appointment_date).getDay();
    const daysOfWeek = [
      'Sundays',
      'Mondays',
      'Tuesdays',
      'Wednesdays',
      'Thursdays',
      'Fridays',
      'Saturdays',
    ];

    // Check if the selected day of the week is in the doctor's available days
    if (!availableDays.includes(daysOfWeek[selectedDayOfWeek])) {
      swal(
        'The doctor is not available on this day of the week. Please select another day in the week.'
      );
      return false;
    }

    // Convert a time in HH:MM format to minutes past midnight
    const timeToMinutes = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    // Convert the doctor's available time range to minutes past midnight
    const availableTimeFrom = timeToMinutes(selectedDoc.dayTo);
    const availableTimeTo = timeToMinutes(selectedDoc.timeTo);

    // Convert the selected time to minutes past midnight
    const selectedTimes = timeToMinutes(formData.appointment_time);

    // Check if the selected time falls within the doctor's available time range
    if (selectedTimes < availableTimeFrom || selectedTimes > availableTimeTo) {
      swal('The doctor is not available at this time of the day. Please select another time.');
      return false;
    }

    // Check if the selected date and time conflicts with the filtered appappointments
    const selectedTime = formData.appointment_time;
    if (
      selectedDate in selectedDoctorAppoints &&
      previousAppointment[selectedDate]?.includes(selectedTime)
    ) {
      swal('This date and time is already booked. Please select another date and time.');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    if (e) e.preventDefault();
    const datas = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      datas.append(key, value);
    });

    if (file) {
      datas.append('medical_report', file);
    }

    if (paystackRef) {
      datas.append('is_paid', true);
      datas.append('payment_status', paystackRef.status);
      datas.append('payment_reference', paystackRef.reference);
    }

    if (validateAppointment()) {
      mutate(datas);
      reset();
    }
  };

  if (isError) {
    reset();
    errorAlert(error);
  }

  return (
    <>
      <Layout name="Add Appointment" title="Appointment">
        <Container maxWidth="xl">
          <Button
            variant="text"
            onClick={handleGoBack}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            sx={{ mb: 2 }}
          >
            Go Back{' '}
          </Button>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h7" gutterBottom>
              Add an Appointment{' '}
            </Typography>
          </Stack>

          <Stack spacing={2} mt={2} ml={-3}>
            <form onSubmit={handleSubmit}>
              {/* <Grid container spacing={3}> */}
              <Card sx={{ position: 'relative', margin: 3, gap: 4, mb: 1, ml: 2, width: '95%' }}>
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
                    <Grid item container xs={8} sm={8} md={4}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="doctor">Appointment Type</InputLabel>
                        <Select
                          required
                          fullWidth
                          label="Select"
                          value={formData?.appointment_type}
                          onChange={handleAppointmentChange}
                          inputProps={{
                            name: 'appointment_type',
                            id: 'appointment_type',
                          }}
                        >
                          {mappedTypes
                            ?.sort((a, b) => a.name.localeCompare(b.name))
                            .map(({ name, _id, price }) => (
                              <MenuItem key={_id} names={name} value={_id}>
                                {' '}
                                {name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item container xs={8} sm={8} md={4}>
                      <TextField
                        value={
                          appointmentPrice
                            ? appointmentPrice.toLocaleString()
                            : 'Please select an appointment type'
                        }
                        required
                        fullWidth
                        readOnly
                        label="Consultation Fee"
                      />
                    </Grid>

                    <Grid item container xs={8} sm={8} md={4}>
                      <TextField
                        type="date"
                        name="appointment_date"
                        value={formData.appointment_date}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        label="Date"
                        InputProps={{
                          inputProps: {
                            min: new Date().toISOString().split('T')[0],
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    spacing={3}
                    style={{ marginLeft: '-20px', marginTop: '-20px' }}
                  >
                    {' '}
                    <Grid item container xs={8} sm={8} md={4}>
                      <TextField
                        type="time"
                        name="appointment_time"
                        value={formData.appointment_time}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        label="Time"
                      />
                    </Grid>
                    <Grid item container xs={8} sm={8} md={4}>
                      <TextField
                        type="text"
                        name="symptoms"
                        value={formData.symptoms}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        label="Symptoms"
                      />
                    </Grid>
                    <Grid item container xs={8} sm={8} md={4}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="appointment_type">Period </InputLabel>
                        <Select
                          label="Period"
                          value={formData?.period}
                          onChange={handleInputChange}
                          required
                          inputProps={{
                            name: 'period',
                            id: 'period',
                          }}
                        >
                          {[
                            '',
                            'One Month',
                            'Two Months',
                            'Three Months',
                            'Four Months',
                            'Six Months +',
                            'One Year',
                            'Two Years',
                            'Three Years',
                          ].map((period) => (
                            <MenuItem key={period} value={period}>
                              {period}
                            </MenuItem>
                          ))}
                        </Select>{' '}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    spacing={3}
                    style={{ marginLeft: '-20px', marginTop: '-20px' }}
                  >
                    {' '}
                    <Grid item container xs={8} sm={8} md={4}>
                      <TextField
                        type="text"
                        name="current_medication"
                        value={formData.current_medication}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        label="Current Medication"
                      />
                    </Grid>
                    <Grid item container xs={8} sm={8} md={4}>
                      <TextField
                        variant="outlined"
                        required
                        type="file"
                        accept=".png, .jpg, .jpeg, "
                        onChange={(e) => {
                          const selectedFile = e.target.files[0];
                          if (!selectedFile.type.startsWith('image/')) {
                            swal(
                              'Invalid file type. Please select an image file. .png, .jpg, .jpeg'
                            );
                            e.target.value = null;
                          } else {
                            addFile(selectedFile);
                          }
                        }}
                      />
                    </Grid>
                    <Grid item container xs={8} sm={8} md={4}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="doctor">Select A Doctor</InputLabel>
                        <Select
                          required
                          fullWidth
                          label="Select Doctor"
                          value={formData?.doctor}
                          onChange={handleDoctorList}
                          inputProps={{
                            name: 'doctor',
                            id: 'doctor',
                          }}
                        >
                          {SeeDods?.sort((a, b) => a.fullname.localeCompare(b.fullname)).map(
                            ({ fullname, _id }) => (
                              <MenuItem key={_id} value={_id}>
                                {fullname}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item container xs={8} sm={8} md={4}>
                      {selectedDoctorAppappointments && selectedDoctorAppappointments.length > 0 ? (
                        <DateCalendarServerRequest Booked={selectedDoctorAppappointments} />
                      ) : (
                        <Typography variant="h7" color="textSecondary" align="left"></Typography>
                      )}
                    </Grid>
                    <Grid item container direction="column" xs={8} sm={8} md={4}>
                      {selectedDoc && selectedDoc.publications ? (
                        <>
                          <Typography variant="h7">Doctor's Available Day(s)</Typography>
                          <Typography variant="body2">{selectedDoc?.publications || ''}</Typography>
                        </>
                      ) : (
                        <Typography variant="h7" color="textSecondary" align="left"></Typography>
                      )}
                    </Grid>
                    <Grid item container direction="column" xs={8} sm={8} md={4}>
                      {selectedDoc && selectedDoc.publications ? (
                        <>
                          <Typography variant="h7">Doctor's Available Time</Typography>

                          <Typography variant="body2">
                            {convertTo12HourFormat(selectedDoc?.dayTo || '')} to{' '}
                            {convertTo12HourFormat(selectedDoc?.timeTo || '')}
                          </Typography>
                        </>
                      ) : (
                        <Typography variant="h7" color="textSecondary" align="left"></Typography>
                      )}
                    </Grid>
                  </Grid>
                </Stack>
              </Card>

              {OpenStack ? (
                <Paystack
                  user={user}
                  datas={appointmentPrice}
                  app={formData}
                  appId={appointmentId}
                  open={OpenStack}
                  onClose={handleClose}
                  onPaymentSuccess={handlePaymentSuccess}
                />
              ) : null}

              <Grid container sx={{ my: 0 }} spacing={1}>
                {!isPaymentSuccessful && (
                  <Button
                    sx={{ mr: 3, ml: 5, mt: 4, width: '120px' }}
                    size="large"
                    type="button"
                    variant="outlined"
                    onClick={handleOpen}
                    disabled={!isFormValid()}
                  >
                    Pay Now
                  </Button>
                )}
                <LoadingButton
                  sx={{ mr: 6, ml: 3, mt: 4, width: '120px' }}
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isLoading > 0}
                  disabled={!isPaymentSuccessful}
                >
                  Submit
                </LoadingButton>
              </Grid>
            </form>
          </Stack>
        </Container>
      </Layout>
    </>
  );
};
export default Appointments;
