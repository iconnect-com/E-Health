import React, { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../../layouts/dashboard/DashboardLayout';
import { Button, Container, Typography, Box, Card, Tab, Tabs, Grid } from '@mui/material';
import Iconify from '../../../components/iconify/Iconify';
import { LoadingButton } from '@mui/lab';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReportCardOne from '../../../components/UserPage/components/ReportCardOne';
import AddReportCardOne from '../../../components/UserPage/components/AddReportCardOne';
import AddReportCardTwo from '../../../components/UserPage/components/AddReportCardTwo';
import { fTimeConvert } from '../../../utils/fTimeConvert';
import formatDateTime from '../../../utils/formatDateTime';
import FormattedDate from '../../../utils/FormattedDate';
import { successAlert } from '../../../utils';
import { useAddReport, useUpdateAppToCompleted } from '../../Patient/Hooks';

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

const AddReport = ({ propId, res }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const appointment = location.state?.appointment;

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const formRef = useRef();

  // let mutateUpdate; // Define mutateUpdate outside of the if block

  const { mutate, reset } = useAddReport();
  const { mutate: mutateUpdate } = useUpdateAppToCompleted(appointment?._id);

  const [formData, setFormData] = useState({
    status: 'Completed',
    activity: 'Completed',
    appointment: appointment,
    diagnosis: '',
    prescription: '',
    routine_advice: '',
    user: appointment?.user,
    doctor: appointment?.doctor,
  });

  const [formDataUpdate, setFormDataUpdate] = useState(null);
  useEffect(() => {
    if (appointment) {
      setFormDataUpdate({
        ...appointment,
        status: 'Completed',
        activity: 'Completed',
      });
    }
  }, [appointment]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true }));
    }
    mutate(formData);
    mutateUpdate({
      id: appointment._id,
      data: formDataUpdate,
    });
    setOpen(false);
    setOpenSuccess(true);
  };

  const handleOk = () => {
    setOpenSuccess(false);
    successAlert(`Medical report for (${appointment?.user?.fullname}) has been sent sucessfully.`);

    navigate('/');
    reset();
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 2,
                mb: 3,
                mt: 3,
              }}
            >
              <Box
                sx={{
                  alignItems: 'left',
                  mx: 6,
                  borderRadius: 0,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="body1">Appointment Date</Typography>
                <Typography variant="h7">
                  <FormattedDate date={appointment?.appointment_date} />
                </Typography>{' '}
              </Box>
              <Box
                sx={{
                  alignItems: 'left',
                  mx: 6,
                  borderRadius: 0,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="body1">Appointment Time</Typography>
                <Typography variant="h7">{fTimeConvert(appointment?.appointment_time)}</Typography>
              </Box>
              <Box
                sx={{
                  alignItems: 'left',
                  mx: 6,
                  borderRadius: 0,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="body1">Doctor</Typography>
                <Typography variant="h7">{appointment?.doctor?.fullname}</Typography>
              </Box>
              <Box
                sx={{
                  alignItems: 'left',
                  mx: 6,
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
                    <AddReportCardOne data={appointment} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <AddReportCardTwo
                      // data={appointment}
                      formData={formData}
                      setFormData={setFormData}
                      formRef={formRef}
                    />
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
            >
              <Grid container sx={{ my: 2 }} spacing={3}>
                <LoadingButton
                  onClick={handleClickOpen}
                  sx={{ marginRight: 6, marginTop: 1, width: '120px' }}
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                  // loading={Boolean(isLoading)}
                >
                  Submit{' '}
                </LoadingButton>
                <Button
                  sx={{ marginRight: 6, marginTop: 1, width: '120px' }}
                  size="large"
                  type="submit"
                  variant="outlined"
                  color="error"
                >
                  Cancel{' '}
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>{'Are you sure?'}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>{'Do you want to SEND this report?'}</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleSubmit} autoFocus>
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog open={openSuccess} onClose={handleOk}>
                  <DialogTitle>
                    <CheckCircleIcon color="success" /> {'Success!'}
                  </DialogTitle>{' '}
                  <DialogContent>
                    <DialogContentText>
                      {'Your report has been submitted successfully.'}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleOk} autoFocus>
                      OK
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Box>
          </TabPanel>
        </Container>
      </Layout>
    </>
  );
};
export default AddReport;
