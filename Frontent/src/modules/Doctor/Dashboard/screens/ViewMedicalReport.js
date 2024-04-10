import React, { useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../../../layouts/dashboard/DashboardLayout';
import { Button, Container, Typography, Box, Card, Tab, Tabs, Grid } from '@mui/material';
import Iconify from '../../../../components/iconify/Iconify';
import { useGetallAppointment } from '../../../Patient/Hooks';
import ReportCardOne from '../../../../components/UserPage/components/ReportCardOne';
import FormattedDate from '../../../../utils/FormattedDate';
import formatDateTime from '../../../../utils/formatDateTime';
import { fTimeConvert } from '../../../../utils/fTimeConvert';
import ReportDocOne from '../../../../components/UserPage/components/ReportDocOne';
import ReportDocTwo from '../../../../components/UserPage/components/ReportDocTwo';

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

const ReportView = ({ propId, res }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const appointment = location.state?.appointment;

  const appappointments = useGetallAppointment();
  const AllA = appappointments?.data;
  const AllApp = AllA?.filter((e) => e?._id === appointment?.appointment);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Layout name="View Consultation" title="Consultations">
        <Container maxWidth="xl">
          <Button
            variant="text"
            onClick={handleGoBack}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            sx={{ mb: 2 }}
          >
            Go Back{' '}
          </Button>
          <Card sx={{ position: 'relative', gap: 4 }}>
            <Card
              sx={{
                position: 'relative',
                borderRadius: 0,
                margin: 2,
                boxShadow: 'none',
                width: '100%',
                mx: 3,
              }}
            >
              <ReportCardOne data={appointment} />{' '}
            </Card>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              aria-label="Inner tabs"
              variant="fullWidth"
            >
              <Tab label="Consultation" />
            </Tabs>
          </Card>

          <TabPanel value={selectedTab} index={0}>
            {AllApp && AllApp?.length > 0 ? (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    mb: 3,
                    mt: 3,
                  }}
                >
                  <Box
                    sx={{
                      alignItems: 'left',
                      mx: 6,
                      mt: 3,
                      borderRadius: 0,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography variant="body1">Appointment Date</Typography>
                    <Typography variant="h7">
                      <FormattedDate date={AllApp[0]?.appointment_date} />
                    </Typography>{' '}
                  </Box>
                  <Box
                    sx={{
                      alignItems: 'left',
                      mx: 6,
                      mt: 3,
                      borderRadius: 0,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography variant="body1">Appointment Time</Typography>
                    <Typography variant="h7">
                      {fTimeConvert(AllApp[0]?.appointment_time)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      alignItems: 'left',
                      mx: 6,
                      mt: 3,
                      borderRadius: 0,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography variant="body1">Doctor</Typography>
                    <Typography variant="h7">Dr. {appointment?.doctor?.fullname}</Typography>
                  </Box>
                  <Box
                    sx={{
                      alignItems: 'left',
                      mx: 6,
                      mt: 3,
                      borderRadius: 0,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography variant="body1">Appointment Ended</Typography>
                    <Typography variant="h7">{formatDateTime(appointment?.updatedAt)}</Typography>
                  </Box>
                </Box>
                <Card
                  sx={{
                    p: 0,
                    backgroundColor: 'transparent',
                    borderRadius: 0,
                    boxShadow: 'none',
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: 0,
                      backgroundColor: 'transparent',
                    }}
                  >
                    <Grid container spacing={8}>
                      <Grid item xs={12} sm={6}>
                        <ReportDocOne data={AllApp[0]} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ReportDocTwo data={appointment} />
                      </Grid>
                    </Grid>
                  </Box>
                </Card>
                <Box
                  sx={{
                    alignItems: 'left',
                    mx: 2,
                    borderRadius: 0,
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                ></Box>
              </>
            ) : (
              <Typography variant="body1">No data available for today's consultation.</Typography>
            )}
          </TabPanel>
        </Container>
      </Layout>
    </>
  );
};
export default ReportView;
