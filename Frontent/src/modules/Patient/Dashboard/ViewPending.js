import React, { useContext, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../../layouts/dashboard/DashboardLayout';
import { Button, Container, Typography, Box, Card, Tab, Tabs, Grid } from '@mui/material';
import { AuthContext } from '../../../context';
import Iconify from '../../../components/iconify/Iconify';
import { useDeleteAppointment, useGetallAppointment } from '../Hooks';
import ConsultCard from '../../../components/UserPage/components/ConsultCard';
import ConsultCardTwo from '../../../components/UserPage/components/ConsultCardTwo';
import { fTimeConvert } from '../../../utils/fTimeConvert';
import { LoadingButton } from '@mui/lab';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { successAlert } from '../../../utils';
import ReschedulingModal from '../../../components/Modal Reschedule';
import FormattedDate from '../../../utils/FormattedDate';

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

const PendingView = ({ propId, res }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const Appoints = useGetallAppointment();
  const AllA = Appoints?.data;
  const AllPat = AllA?.filter((e) => e?.user?._id === user?.id && e?.status === 'Pending');

  const appointment = AllPat?.find((appt) => appt?._id === id);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const { mutate, reset } = useDeleteAppointment();
  const [formData] = useState({
    id: appointment?.id,
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = (e) => {
    e.preventDefault();
    mutate({ id: appointment._id, data: formData });
    reset();
    setOpen(false);
    setOpenSuccess(true);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOk = () => {
    setOpenSuccess(false);
    successAlert(
      `Appoinment with (Dr. ${appointment?.doctor?.fullname}) has been deleted sucessfully.`
    );
    navigate('/');
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
                  borderColor: 'divider',
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
                  mt: 3,
                  borderRadius: 0,
                  borderColor: 'divider',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="body1">Appointment Time</Typography>
                <Typography variant="h7">
                  {fTimeConvert(appointment?.appointment_time)}
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
                <Typography variant="h7">{appointment?.appointment_type?.name}</Typography>
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
                <Typography variant="body1">Doctor's Name</Typography>
                <Typography variant="h7">{appointment?.doctor?.fullname}</Typography>
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
                </Grid>
              </Box>
            </Card>{' '}
            <ReschedulingModal data={appointment} open={openModal} handleClose={handleCloseModal} />
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
              <Grid container sx={{ my: 2, mt: 3 }} spacing={3}>
                <LoadingButton
                  onClick={handleClickOpen}
                  sx={{ mr: 6, mt: 1, width: '100px' }}
                  size="medium"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Delete
                </LoadingButton>
                <Button
                  sx={{ mr: 6, mt: 1, width: '100px' }}
                  size="medium"
                  type="submit"
                  variant="outlined"
                  color="error"
                  onClick={handleOpenModal}
                >
                  Reschedule
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>{'Are you sure?'}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      {'Do you want to DELETE this appointment?'}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleYes} autoFocus>
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
                      {'Your appointment has been deleted successfully.'}
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
export default PendingView;
