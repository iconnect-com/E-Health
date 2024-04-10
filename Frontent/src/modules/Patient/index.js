import React, { useContext, Suspense } from 'react';
import { Grid, Container, Typography, Box } from '@mui/material';
import SummaryCard from '../../components/Summary Card';
import OrderItem from '../../components/AppointCard/AppCard';
import AppCurrentVisits from '../../layouts/sections/@dashboard/app/AppCurrentVisits';
import Layout from '../../layouts/dashboard/DashboardLayout';
import { useTheme } from '@mui/material/styles';
import { PrivatePaths } from '../../routes/path';
import { AuthContext } from '../../context';
import {
  useCount4PatientApp,
  usePatientAppCalendar,
  usePatientAppCompleted,
  usePatientAppPend,
  useReportCount,
} from '../../utils/filter';
import { Link } from 'react-router-dom';
import { useGetallAppointment } from './Hooks';
import { format } from 'date-fns';
import DateCalendarServerRequest from './../../components/DatePicker';
import { LinearProgress } from '@material-ui/core';

const Patient = () => {
  const { user } = useContext(AuthContext);
  const theme = useTheme();

  //-----------------Patient-----------------
  const Booked = usePatientAppCalendar({ propId: 123 }); //Booked Appointments for Patient
  const CONFIRMED = useCount4PatientApp({ propId: 123 }); //Confirmed Appointments
  const PENDING = usePatientAppPend({ propId: 123 }); //Pending Appointments
  const COMPLETED = usePatientAppCompleted({ propId: 123 }); //Active Appointments
  const MEDICALSCOUNT = useReportCount({ propId: 123 }); //Medicals in Pending counts

  //-----------------User's Appointment Graph-----------------
  const patientsComp = COMPLETED?.total || 0;
  const patientsConf = CONFIRMED?.total || 0;
  const patientsPend = PENDING?.total || 0;
  const highlightedDays = Booked?.total;

  const AppointmentData = useGetallAppointment();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Data for Calendar, for Patient
  const appointmentTPat =
    AppointmentData?.data?.filter(
      (appointment) => appointment?.user?._id === user?.id && appointment?.status === 'Confirmed'
    ) || [];

  const patAppointmentTimes =
    appointmentTPat
      .map((appointment) => appointment?.appointment_date)
      .filter((date) => new Date(date) >= today) || [];

  const PatCalendar = patAppointmentTimes?.map((date) => format(new Date(date), 'MM-dd-yyyy'));

  const DoctorDashboard = React.lazy(() => import('../Doctor'));
  const AdminDashboard = React.lazy(() => import('../Admin'));

  return (
    //-----------------Admin-----------------

    <Layout name="Dashboard" title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" gutterBottom>
          Hi, {user?.fullname}
        </Typography>

        <Typography variant="body2" sx={{ mb: 5 }}>
          It's good to see you again!
        </Typography>
        <Grid container spacing={3}>
          {user?.role === 'Admin' ? (
            <>
              <Suspense fallback={<LinearProgress />}>
                <AdminDashboard />
              </Suspense>
            </>
          ) : //-----------------Doctor-----------------
          user?.role === 'Doctor' ? (
            <>
              <Suspense fallback={<LinearProgress />}>
                <DoctorDashboard />
              </Suspense>
            </>
          ) : (
            //-----------------Requester-----------------
            <>
              {' '}
              <Grid item xs={12} sm={6} md={3}>
                <SummaryCard
                  title="Pending Appointments"
                  total={PENDING?.total || 0}
                  color="error"
                  icon={'medical-icon:i-outpatient'}
                  url={`${PrivatePaths.PATIENT}/appointments/pending`}
                />
                <Box mt={2}>
                  <SummaryCard
                    title="Consultations"
                    total={COMPLETED?.total || 0}
                    color="success"
                    icon={'jam:medical'}
                    url={`${PrivatePaths.PATIENT}/consultations`}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <SummaryCard
                  title="Active Appointments"
                  total={CONFIRMED?.total || 0}
                  color="secondary"
                  icon={'medical-icon:i-outpatient'}
                  url={`${PrivatePaths.PATIENT}/appointments`}
                />
                <Box mt={2}>
                  <SummaryCard
                    title="Medical Reports"
                    total={MEDICALSCOUNT?.total || 0}
                    color="warning"
                    icon={'streamline:checkup-medical-report-clipboard'}
                    url={`${PrivatePaths.PATIENT}/report`}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                {highlightedDays && highlightedDays.length > 0 ? (
                  <Box mt={1} mx={3}>
                    <Link to="/patient/appointments">
                      <OrderItem
                        title="Upcoming Appointments"
                        list={highlightedDays
                          .filter((app) => new Date(app.appointment_date) > new Date())
                          .sort(
                            (a, b) => new Date(a.appointment_date) - new Date(b.appointment_date)
                          )
                          .slice(0, 4)
                          .map((app, index) => ({
                            id: app?._id,
                            app: app,
                            index: index + 1,
                            time: app?.appointment_date,
                          }))}
                      />
                    </Link>
                  </Box>
                ) : (
                  <Typography variant="h6" color="textSecondary" align="center">
                    No Appointment Booked
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <DateCalendarServerRequest Booked={PatCalendar} />;
              </Grid>
              <Grid item xs={12} md={6} slg={4}>
                <AppCurrentVisits
                  title="Appointment Graphs"
                  chartData={[
                    { label: 'Pending', value: patientsPend },
                    { label: 'Confirmed', value: patientsConf },
                    { label: 'Completed', value: patientsComp },
                  ]}
                  chartColors={[
                    theme.palette.error.main,
                    theme.palette.warning.main,
                    theme.palette.success.main,
                  ]}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </Layout>
  );
};

export default Patient;
