import React, { useContext, useEffect, useState } from 'react';
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
import { useGetallAppointment, useUpdateAppointment } from '../../Patient/Hooks';
import ConsultCard from '../../../components/UserPage/components/ConsultCard';
import ConsultCardTwo from '../../../components/UserPage/components/ConsultCardTwo';
import { fTimeConvert } from '../../../utils/fTimeConvert';
import { LoadingButton } from '@mui/lab';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FormattedDate from '../../../utils/FormattedDate';
import { successAlert } from '../../../utils';
import ReschedulingModal from '../../../components/Modal Reschedule';
import swal from 'sweetalert';

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

const WaitingView = ({ propId, res }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [opens, setOpens] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const Appoints = useGetallAppointment();
  const AllA = Appoints?.data;
  const AllPat = AllA?.filter((e) => e?.doctor?._id === user?.id && e?.status === 'Pending');
  const appointment = AllPat?.find((appt) => appt?._id === id);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const [teamsMeetingLink, setTeamsMeetingLink] = useState('');
  const { mutate } = useUpdateAppointment(id);
  const { mutate: mutateReject } = useUpdateAppointment(id);
  const [formData, setFormData] = useState(null);
  const [formDataRejected, setFormDataRejected] = useState(null);

  useEffect(() => {
    const init = async (retryCount = 0) => {
      try {
        const resTeams = await fetch(process.env.REACT_APP_TEAMS_MEETING_FUNCTION);

        const link = await resTeams.text();
        if (link) {
          setTeamsMeetingLink(link);
          setFormData((prevFormData) => ({
            ...(prevFormData ? prevFormData : {}),
            teamsMeetingLink: link,
          }));
        }
      } catch (error) {
        if (retryCount < 3) {
          init(retryCount + 1);
        } else {
        }
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (appointment) {
      setFormData({
        ...appointment,
        status: 'Confirmed',
        activity: 'Confirmed',
      });

      setFormDataRejected({
        ...appointment,
        status: 'Rejected',
        activity: 'Rejected',
      });
    }
  }, [appointment]);

  const handleYes = (e) => {
    e.preventDefault();

    if (!teamsMeetingLink) {
      swal('The meeting link is not available, try confirming appointment again.)');

      return;
    }

    mutate({ id: appointment?._id, data: formData });
    setOpen(false);
    setOpenSuccess(true);
  };

  const handleNo = (e) => {
    e.preventDefault();
    mutateReject({ id: appointment?._id, data: formDataRejected });
    setOpens(false);
    setOpenReject(true);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Handle clicks for Reject and accept
  const handleClickOpen = () => {
    setOpen(true);
  };
  const ClickOpenReject = () => {
    setOpens(true);
  };

  //Handle close for Accept and Reject also
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloses = () => {
    setOpens(false);
  };

  const handleOk = () => {
    setOpenSuccess(false);
    successAlert(`Appoinment with  (${appointment?.user?.fullname}) confirmed sucessfully.`);
    navigate('/');
  };

  const handleOkay = () => {
    setOpenSuccess(false);
    successAlert(`Appoinment with  (${appointment?.user?.fullname}) rejected sucessfully.`);
    navigate('/');
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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

          <ReschedulingModal data={appointment} open={openModal} handleClose={handleCloseModal} />

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
                  sx={{ marginRight: 6, marginTop: 1, width: '100px' }}
                  size="small"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Accept
                </LoadingButton>
                <Button
                  onClick={ClickOpenReject}
                  sx={{ marginRight: 6, marginTop: 1, width: '100px' }}
                  size="small"
                  type="submit"
                  variant="outlined"
                  color="error"
                >
                  Reject
                </Button>

                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>{'Are you sure?'}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      {'Do you want to ACCEPT this appointment?'}
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
                    <DialogContentText>{'Appointment confirmed Successfully.'}</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleOk} autoFocus>
                      OK
                    </Button>
                  </DialogActions>
                </Dialog>

                <Dialog open={opens} onClose={handleCloses}>
                  <DialogTitle>{'Are you sure?'}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      {'Do you want to REJECT this appointment?'}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloses}>No</Button>
                    <Button onClick={handleNo} autoFocus>
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog open={openReject} onClose={handleOkay}>
                  <DialogTitle>
                    <CheckCircleIcon color="success" /> {'Success!'}
                  </DialogTitle>{' '}
                  <DialogContent>
                    <DialogContentText>{'Appointment rejected Successfully.'}</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleOkay} autoFocus>
                      OK
                    </Button>
                  </DialogActions>
                </Dialog>
                <Button
                  sx={{ marginRight: 6, marginTop: 1, width: '100px', color: 'primary' }}
                  size="small"
                  type="submit"
                  variant=""
                  color="primary"
                  onClick={handleOpenModal}
                >
                  Reschedule
                </Button>
              </Grid>
            </Box>
          </TabPanel>
        </Container>
      </Layout>
    </>
  );
};
export default WaitingView;
