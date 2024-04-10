import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../layouts/dashboard/DashboardLayout';
import { useGetallAppointment } from '../Hooks';
import { AuthContext } from '../../../context';
import { Stack, Button, Container, Typography } from '@mui/material';
import Iconify from '../../../components/iconify';
import TablePage from '../../../components/TablePage';
import FormattedDate from '../../../utils/FormattedDate';
import { fTimeConvert } from '../../../utils/fTimeConvert';
import StatusColor from '../../../components/StatusColor';

const Pending = ({ propId, res }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const Appoints = useGetallAppointment();
  const AllA = Appoints?.data;
  const AllPat = AllA?.filter((e) => e?.user?._id === user?.id && e?.status === 'Pending');

  const mappedData = AllPat?.map((item, index) => ({
    ...item,
    key: index,
    index: AllPat.length - index - 1,
  })).reverse();

  const handleOpen = () => {
    navigate(`/patient/appointments-history`);
  };

  const actions = (res) => [
    {
      label: 'View',
      icon: 'eva:eye-outline',
      onClick: (res) => {
        navigate(`/patient/appointments/pending/${res._id}`);
      },
    },
  ];

  const columns = [
    { id: '' },
    { id: 'sn', label: 'S/N', render: (rowData) => rowData.index + 1 },
    {
      id: 'doctor',
      label: 'Doctor',
      render: (rowData) => rowData.doctor?.fullname,
    },
    {
      id: 'appointment_type',
      label: 'Appointment Type',
      render: (rowData) => rowData.appointment_type?.name,
    },
    {
      id: 'appointment_date',
      label: 'Appointment Date',
      render: (rowData) => <FormattedDate date={rowData.appointment_date} />,
    },
    {
      id: 'appointment_time',
      label: 'Appointment Time',
      render: (rowData) => fTimeConvert(rowData.appointment_time),
    },
    { id: 'symptoms', label: 'Symptoms' },

    {
      id: 'status',
      label: 'Status',
      render: (rowData) => (
        <StatusColor status={rowData.status} color={'#a661da'} bg={'rgba(166, 97, 218,0.1)'} />
      ),
    },
  ];

  return (
    <>
      <Layout name="All Appointment" title="Appappointments">
        <Container maxWidth="xl">
          <Button
            variant="text"
            onClick={handleGoBack}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            sx={{ mb: 2 }}
          >
            Go Back{' '}
          </Button>

          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h7" gutterBottom>
              Pending Appappointments{' '}
            </Typography>
            <Button variant="contained" sx={{ marginRight: 0 }} onClick={handleOpen}>
              Appointment History
            </Button>
          </Stack>
          <TablePage data={mappedData} columns={columns} actions={actions()} keyProp="index" />
        </Container>
      </Layout>
    </>
  );
};
export default Pending;
