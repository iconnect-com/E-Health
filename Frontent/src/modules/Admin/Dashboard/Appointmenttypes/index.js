import React, { useMemo, useState } from 'react';
import Layout from '../../../../layouts/dashboard/DashboardLayout';
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../../../components/iconify';
import TablePage from '../../../../components/TablePage';
import { useAddAppType, useDeletelAppType, useGetAppType } from '../../hooks';
import FormattedDate from '../../../../utils/FormattedDate';
import Modal from '@mui/material/Modal';
import { LoadingButton } from '@mui/lab';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import { useIsMutating } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const AppointTypes = () => {
  const { data: AppsTypes } = useGetAppType();
  const navigate = useNavigate();
  const isLoading = useIsMutating();
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpens = () => setOpens(true);
  const handleCloses = () => setOpens(false);
  const handleGoBack = () => {
    navigate(-1);
  };

  const mappedData = useMemo(() => {
    if (Array.isArray(AppsTypes)) {
      return AppsTypes.map((item, index) => ({
        ...item,
        index: AppsTypes.length - index - 1,
      })).reverse();
    }
    return [];
  }, [AppsTypes]);

  const actions = (res) => [
    {
      label: 'Delete',
      icon: 'eva:trash-2-outline',
      key: `action-delete-${res?._id}`,
      onClick: (res) => {
        setData(res);
        handleOpens();
      },
    },
  ];

  const columns = [
    { id: 'sn', label: 'S/N', render: (rowData) => rowData.index + 1 },
    {
      id: 'name',
      label: 'Appointment Type',
      render: (rowData) => rowData?.name,
    },
    {
      id: 'price',
      label: 'Price',
      render: (rowData) => rowData?.price,
    },
    {
      id: 'updatedAt',
      label: 'Updated',
      render: (rowData) => <FormattedDate date={rowData.updatedAt} />,
    },

    // { id: '' },
  ];
  const { mutate, reset } = useAddAppType();
  const { mutate: Delete } = useDeletelAppType();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: () => {
        // Reset the form data
        setFormData({
          name: '',
          price: '',
        });
        setOpen(false);
      },
    });
  };

  const handleYes = (e) => {
    e.preventDefault();
    if (data) {
      Delete(data?._id);
      setOpens(false);
      // setOpenSuccess(true);
    }
  };

  const handleOk = () => {
    setOpenSuccess(false);
    reset();
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    p: 4,
  };

  return (
    <>
      <Layout name="Appoitment Types" title="types">
        <Container maxWidth="xl">
          <Button
            variant="text"
            onClick={handleGoBack}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            sx={{ mb: 2 }}
          >
            Go Back{' '}
          </Button>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 0 }}
          ></Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
            <Typography variant="h7" gutterBottom>
              All Appointment Types{' '}
            </Typography>
            <Button
              startIcon={<Iconify icon="eva:plus-fill" />}
              variant="contained"
              sx={{ marginRight: 5 }}
              onClick={handleOpen}
            >
              Add New{' '}
            </Button>
          </Stack>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <form onSubmit={submitHandler}>
                  <Stack direction="column" alignItems="left" justifyContent="space-between" mb={3}>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Add new appointment type{' '}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="p" gutterBottom>
                        Here, you can add an appointment type and the price for user to see before
                        booking an appointment.
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack spacing={3}>
                    <TextField
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      name="name"
                      type="name"
                      label="Appointment Name"
                    />
                    <TextField
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      name="price"
                      type="price"
                      label="Input Price"
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ my: 2 }}
                  ></Stack>
                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isLoading > 0}
                  >
                    Submit
                  </LoadingButton>
                </form>
              </Box>
            </Fade>
          </Modal>
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
              <CircularProgress />
            </Box>
          ) : (
            <TablePage data={mappedData} columns={columns} actions={actions()} />
          )}{' '}
        </Container>{' '}
        <Dialog open={opens} onClose={handleCloses}>
          <DialogTitle>{'Are you sure?'}</DialogTitle>
          <DialogContent>
            <DialogContentText>{`Do you want to remove (${data?.name})?`}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloses}>No</Button>
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
            <DialogContentText>{` (${data?.name}) remove successfully`}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOk} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Layout>
    </>
  );
};

export default AppointTypes;
