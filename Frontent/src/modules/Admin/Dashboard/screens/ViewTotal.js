import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../../../layouts/dashboard/DashboardLayout';
import { Button, Container, Typography, Box, Card, Tab, Tabs, Grid } from '@mui/material';
import Iconify from '../../../../components/iconify/Iconify';
import { useGetallAppointment } from '../../../Patient/Hooks';
import ConsultCard from '../../../../components/UserPage/components/ConsultCard';
import ConsultCardTwo from '../../../../components/UserPage/components/ConsultCardTwo';
import formatDateTime from '../../../../utils/formatDateTime';
import { fTimeConvert } from '../../../../utils/fTimeConvert';
import StatusColor from '../../../../components/StatusColor';

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

const CompletedView = ({ propId, res }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const Appoints = useGetallAppointment();
  const AllA = Appoints?.data;
  const appointment = AllA?.find((appt) => appt?._id === id);
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
              <ConsultCard data={appointment} />{' '}
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                flexWrap: 'wrap',
                mb: 3,
                mt: 3,
              }}
            >
              <Box
                sx={{
                  alignItems: 'left',
                  mx: 4,
                  mt: 3,
                  borderRadius: 0,
                  borderColor: 'divider',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="body1">Appointment Started</Typography>
                <Typography variant="h7">
                  {formatDateTime(appointment?.appointment_date)}
                </Typography>{' '}
              </Box>
              <Box
                sx={{
                  alignItems: 'left',
                  mx: 4,
                  mt: 3,
                  borderRadius: 0,
                  borderColor: 'divider',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="body1">Appointment Type</Typography>
                <Typography variant="h7">{appointment?.appointment_type?.name}</Typography>
              </Box>
              <Box
                sx={{
                  alignItems: 'left',
                  mx: 4,
                  mt: 3,
                  borderRadius: 0,
                  borderColor: 'divider',
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
                  mx: 4,
                  mt: 3,
                  borderRadius: 0,
                  borderColor: 'divider',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="body1">Appointment Status</Typography>
                <StatusColor
                  status={appointment?.status}
                  color={'#a661da'}
                  bg={'rgba(166, 97, 218,0.1)'}
                />
              </Box>
              <Box
                sx={{
                  alignItems: 'left',
                  mx: 4,
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
                    <ConsultCardTwo data={appointment} />{' '}
                  </Grid>
                  {/* <Grid item xs={12} sm={6}>
                    <ConsultCardTwo data={appointment} />{' '}
                  </Grid> */}
                </Grid>
              </Box>
            </Card>{' '}
          </TabPanel>
        </Container>
      </Layout>
    </>
  );
};
export default CompletedView;
