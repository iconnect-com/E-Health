import React, { useContext } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import SummaryCard from '../../components/Summary Card';
import OrderItem from '../../components/AppointCard/AppCardDoc';
import AppCurrentVisits from '../../layouts/sections/@dashboard/app/AppCurrentVisits';
import { useTheme } from '@mui/material/styles';
import { PrivatePaths } from '../../routes/path';
import { AuthContext } from '../../context';
import {
  AllPatientDoc,
  useDocCalendar,
  useDocEngaged,
  useDocWait,
  useDoctorAppCompleted,
} from '../../utils/filter';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import DateCalendarServerRequest from './../../components/DatePicker';
import { useGetallAppointment } from '../Patient/Hooks';

const Patient = () => {
  const { user } = useContext(AuthContext);
  const theme = useTheme();

  //-----------------Doctor-----------------
  const DOCENGAGED = useDocEngaged({ propId: 123 }); //Doctor Engaged Appointments
  const DOCWAITING = useDocWait({ propId: 123 }); //Doctor Waiting Appointments
  const Pat4Docs = AllPatientDoc({ propId: 123 }); //Doctor's All Patients Count
  const DOCCALENDAR = useDocCalendar({ propId: 123 }); //Doctor Calendet for Engaged Appointments
  const DOCCOMPLETE = useDoctorAppCompleted({ propId: 123 }); //Doctor count for Completed Appointments

  //-----------------Doctor's Graph-----------------
  const DocCompleted = DOCCOMPLETE?.total || 0;
  const DocEngaged = DOCENGAGED?.total || 0;
  const DocWaiting = DOCWAITING?.total || 0;
  const highlightDays = DOCCALENDAR?.total;

  const AppointmentData = useGetallAppointment();

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set the time to 00:00:00 for accurate comparison

  // Data for Calendar, for Doctor
  const appointmentTDoc =
    AppointmentData?.data?.filter(
      (appointment) => appointment?.doctor?._id === user?.id && appointment?.status === 'Confirmed'
    ) || [];

  const docAppointmentTimes =
    appointmentTDoc
      .map((appointment) => appointment?.appointment_date)
      .filter((date) => new Date(date) >= today) || [];

  const DocCalendar = docAppointmentTimes?.map((date) => format(new Date(date), 'MM-dd-yyyy'));

  return (
    //-----------------Admin-----------------

    <Grid container spacing={3} ml={1}>
      <>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Patients"
            total={Pat4Docs?.total || 0}
            icon={'mdi:patient'}
            color="primary"
            url={`${PrivatePaths.DOCTOR}/patients`}
          />
          <Box mt={2}>
            <SummaryCard
              title="Appointments"
              total={DOCENGAGED?.total || 0}
              icon={'icon-park-solid:appointment'}
              color="success"
              url={`${PrivatePaths.DOCTOR}/appointments`}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Waiting Appointments"
            total={DOCWAITING?.total || 0}
            icon={'icon-park-solid:appointment'}
            color="error"
            url={`${PrivatePaths.DOCTOR}/appointments/waiting`}
          />

          <Box mt={2}>
            <SummaryCard
              title="Completed Appointments"
              total={DOCCOMPLETE?.total || 0}
              icon={'icon-park-solid:appointment'}
              url={`${PrivatePaths.DOCTOR}/appointments/completed`}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          {highlightDays && highlightDays.length > 0 ? (
            <Box mt={1} mx={3}>
              <Link to="/doctor/appointments">
                <OrderItem
                  title="Upcoming Appointments"
                  list={highlightDays
                    .filter((app) => new Date(app.appointment_date) > new Date())
                    .sort((a, b) => new Date(a.appointment_date) - new Date(b.appointment_date))
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
            <Typography variant="h7" color="textSecondary" align="center">
              No Appointment Booked
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <DateCalendarServerRequest Booked={DocCalendar} />;
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Appointments Graph"
            chartData={[
              { label: 'Engaged', value: DocEngaged },
              { label: 'Waiting', value: DocWaiting },
              { label: 'Completed', value: DocCompleted },
            ]}
            chartColors={[
              theme.palette.warning.main,
              theme.palette.error.main,
              theme.palette.success.main,
            ]}
          />
        </Grid>
      </>
    </Grid>
  );
};

export default Patient;

// Colors
//
//  colors: [
//   theme.palette.primary.main,
//   theme.palette.warning.main,
//   theme.palette.info.main,
//   theme.palette.error.main,
//   theme.palette.success.main,
//   theme.palette.warning.dark,
//   theme.palette.success.darker,
//   theme.palette.info.dark,
//   theme.palette.info.darker,
// ],
