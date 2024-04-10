import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Stack, Button, Container, Typography } from '@mui/material';
import TablePage from '../../../../components/TablePage';
import { useGetallAppointment } from '../../../Patient/Hooks';
import { AuthContext } from '../../../../context';
import Iconify from '../../../../components/iconify';
import DashboardLayout from '../../../../layouts/dashboard/DashboardLayout';
import FormattedDate from '../../../../utils/FormattedDate';
import { fTimeConvert } from '../../../../utils/fTimeConvert';
import StatusColor from '../../../../components/StatusColor';

const CompletedAppappointments = ({ propId, res }) => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const APPappointments = useGetallAppointment(propId || id);
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const medic =
    APPappointments?.data?.filter((appointment) => appointment?.status === 'Completed') || [];
  const mappedData = medic
    ?.map((item, index) => ({
      ...item,
      index: medic.length - index - 1,
    }))
    .reverse();

  const actions = (res) => [
    {
      label: 'View',
      icon: 'eva:eye-outline',
      key: `action-${res?._id}`,
      onClick: (res) => {
        navigate(`/app/appointments/completed/${res._id}`);
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
      id: 'patient',
      label: 'Patient',
      render: (rowData) => rowData.user?.fullname,
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
    { id: 'current_medication', label: 'Current Medication' },
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
      <DashboardLayout name="All Appointment" title="Appappointments">
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
              Completed Appappointments{' '}
            </Typography>
          </Stack>
          <TablePage data={mappedData} columns={columns} actions={actions()} />
        </Container>
      </DashboardLayout>
    </>
  );
};
export default CompletedAppappointments;
