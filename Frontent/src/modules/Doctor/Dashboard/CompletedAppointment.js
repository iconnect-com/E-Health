import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../layouts/dashboard/DashboardLayout';
import { AuthContext } from '../../../context';
import { Stack, Button, Container, Typography } from '@mui/material';
import Iconify from '../../../components/iconify';
import TablePage from '../../../components/TablePage';
import FormattedDate from '../../../utils/FormattedDate';
import { useGetallAppointment } from '../../Patient/Hooks';
import { fTimeConvert } from '../../../utils/fTimeConvert';
import StatusColor from '../../../components/StatusColor';

const CompletedAppointment = ({ propId, res }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  const Appoints = useGetallAppointment();
  const AllA = Appoints?.data;
  const AllPat = AllA?.filter((e) => e?.doctor?._id === user?.id && e?.status === 'Completed');

  const mappedData = AllPat?.map((item, index) => ({
    ...item,
    index: AllPat.length - index - 1,
  })).reverse();

  const actions = (res) => [
    {
      label: 'View',
      icon: 'eva:eye-outline',
      key: `action-${res?._id}`,
      onClick: (res) => {
        navigate(`/doctor/appointments/completed/${res._id}`);
      },
    },
  ];

  const handleOpen = () => {
    navigate(`/doctor/appointments-history`);
  };

  const columns = [
    { id: '' },
    { id: 'sn', label: 'S/N', render: (rowData) => rowData.index + 1 },
    {
      id: 'patient',
      label: 'Patient',
      render: (rowData) => rowData.user?.fullname,
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
      <Layout name="Completed Appointment" title="Appappointments">
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
              Completed Appointment{' '}
            </Typography>

            <Button variant="contained" sx={{ marginRight: 0 }} onClick={handleOpen}>
              Appointment History
            </Button>
          </Stack>
          <TablePage data={mappedData} columns={columns} actions={actions()} />
        </Container>
      </Layout>
    </>
  );
};
export default CompletedAppointment;
