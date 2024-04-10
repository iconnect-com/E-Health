import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../../layouts/dashboard/DashboardLayout';
import { Button, Container, Typography, Box, Card, Tab, Tabs, Grid } from '@mui/material';
import Iconify from '../../../components/iconify/Iconify';
import { useGetallAppointment } from '../../Patient/Hooks';
import ConsultCard from '../../../components/UserPage/components/ConsultCard';
import ConsultCardTwo from '../../../components/UserPage/components/ConsultCardTwo';
import formatDateTime from '../../../utils/formatDateTime';
import { fTimeConvert } from '../../../utils/fTimeConvert';
import StatusColor from '../../../components/StatusColor';
import { AuthContext } from '../../../context';

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
        <Box sx={{ p: 3 }}>
          {Array.isArray(children)
            ? children
            : // Wrap non-array children in an array
            children
            ? [children]
            : null}
        </Box>
      )}
    </div>
  );
}

const ViewHistory = ({ propId, res }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const handleGoBack = () => {
    navigate(-1);
  };

  const { id } = useParams();

  const Appoints = useGetallAppointment();
  const AllA = Appoints?.data;
  const AllPat = AllA?.filter((e) => e?.user?._id === user?.id);
  const mappedData = AllPat?.find((appt) => appt?._id === id);

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
              <ConsultCard data={mappedData} />{' '}
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
                flexWrap: 'wrap',
                mb: 5,
                mt: 5,
              }}
            >
              <Box
                sx={{
                  alignItems: 'left',
                  mx: 6,
                  mt: 3,
                  borderRadius: 0,
                  borderColor: 'divider',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="body1">Appointment Time</Typography>
                <Typography variant="h7">
                  {fTimeConvert(mappedData?.appointment_time)}
                </Typography>{' '}
              </Box>
              <Box
                sx={{
                  alignItems: 'left',
                  mx: 6,
                  mt: 3,
                  borderRadius: 0,
                  borderColor: 'divider',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="body1">Appointment Type</Typography>
                <Typography variant="h7">{mappedData?.appointment_type?.name}</Typography>
              </Box>
              <Box
                sx={{
                  alignItems: 'left',
                  mx: 6,
                  mt: 3,
                  borderRadius: 0,
                  borderColor: 'divider',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="body1">Appointment Status</Typography>
                <StatusColor
                  status={mappedData?.status}
                  color={'#a661da'}
                  bg={'rgba(166, 97, 218,0.1)'}
                />
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
                <Typography variant="h7">{formatDateTime(mappedData?.updatedAt)}</Typography>
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
                    <ConsultCardTwo data={mappedData} />{' '}
                  </Grid>
                </Grid>
              </Box>
            </Card>{' '}
          </TabPanel>

          <TabPanel value={selectedTab} index={6}></TabPanel>
        </Container>
      </Layout>
    </>
  );
};
export default ViewHistory;
