import React from 'react';
import { Grid } from '@mui/material';
import SummaryCard from '../../components/Summary Card';
import AppCurrentVisits from '../../layouts/sections/@dashboard/app/AppCurrentVisits';
import { useTheme } from '@mui/material/styles';
import { PrivatePaths } from '../../routes/path';
import {
  useAllAppoint,
  useAudit,
  useCompdAppoint,
  useConfirmAppoint,
  usePendAppoint,
  useRectedAppoint,
} from '../../utils/filter';
import { useGetAllDoctorCount, useGetAllPatientCount } from '../Auth/hooks';

const Admin = () => {
  const theme = useTheme();
  //For all Roles
  const Docs = useGetAllDoctorCount({ propId: 123 });
  const Pats = useGetAllPatientCount({ propId: 123 });

  //-----------------Admin Appointments-----------------
  const AUDITS = useAudit({ propId: 123 }); //Audits
  const Appoint = useAllAppoint({ propId: 123 }); //All Appointments
  const PendAppoint = usePendAppoint({ propId: 123 }); //All Pending
  const CompAppoint = useCompdAppoint({ propId: 123 }); //All Completed
  const ConfAppoint = useConfirmAppoint({ propId: 123 }); //All Confirmed
  const RejectAppoint = useRectedAppoint({ propId: 123 }); //All Rejected

  //-----------------User's Graph-----------------
  const CompleteTotal = CompAppoint?.total || 0;
  const pendingTotal = PendAppoint?.total || 0;
  const ConfirmTotal = ConfAppoint?.total || 0;
  const RejectTotal = RejectAppoint?.total || 0;

  //-----------------Admin's Count-----------------
  const DoctorAll = Docs?.doctor || 0;
  const PatientAll = Pats?.patient || 0;

  return (
    //-----------------Admin-----------------

    <>
      <Grid container spacing={3} ml={1}>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Total Appointment"
            total={Appoint?.total || 0}
            icon={'icon-park-solid:appointment'}
            color="success"
            url={`${PrivatePaths.ADMIN}/appointments`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Pending Appointment"
            total={PendAppoint?.total || 0}
            icon={'icon-park-solid:appointment'}
            color="error"
            url={`${PrivatePaths.ADMIN}/appointment/pending`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Confirmed Appointment"
            total={ConfAppoint?.total || 0}
            icon={'icon-park-solid:appointment'}
            color="warning"
            url={`${PrivatePaths.ADMIN}/appointment/confirmed`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Completed Appointment"
            total={CompAppoint?.total || 0}
            icon={'icon-park-solid:appointment'}
            url={`${PrivatePaths.ADMIN}/appointment/completed`}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Rejected Appointment"
            total={RejectAppoint?.total || 0}
            icon={'icon-park-solid:appointment'}
            color="errors"
            url={`${PrivatePaths.ADMIN}/appointment/rejected`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="All Doctors"
            total={DoctorAll || 0}
            icon={'healthicons:doctor-male'}
            url={`${PrivatePaths.ADMIN}/users/doctors`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="All Patients"
            total={PatientAll || 0}
            icon={'mdi:patient'}
            color="primary"
            url={`${PrivatePaths.ADMIN}/users/patients`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Medical Report"
            total={AUDITS?.total || 0}
            color="success"
            icon={'streamline:checkup-medical-report-clipboard'}
            url={`${PrivatePaths.ADMIN}/reports`}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Appointment Graphs"
            chartData={[
              { label: 'Confirmed', value: ConfirmTotal },
              { label: 'Completed', value: CompleteTotal },
              { label: 'Rejected', value: RejectTotal },
              { label: 'Pending', value: pendingTotal },
            ]}
            chartColors={[
              theme.palette.warning.main,
              theme.palette.success.main,
              theme.palette.error.main,
              theme.palette.info.main,
            ]}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Admin;
