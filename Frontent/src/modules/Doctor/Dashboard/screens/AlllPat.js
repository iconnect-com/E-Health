import React, { useContext } from 'react';
import { Button, Container, Stack, Typography } from '@mui/material';
import Layout from '../../../../layouts/dashboard/DashboardLayout';
import { AuthContext } from '../../../../context';
import Iconify from '../../../../components/iconify';
import TablePage from '../../../../components/TablePage';
import { useGetallAppointment } from '../../../Patient/Hooks';
import StatusColor from '../../../../components/StatusColor';
import { useNavigate } from 'react-router-dom/dist';

const AllPatients = ({ propId, res }) => {
  const handleGoBack = () => {
    navigate(-1);
  };
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const Appoints = useGetallAppointment();
  const AllA = Appoints?.data;

  let AllPat = [];
  if (AllA) {
    AllPat = Object.values(
      AllA.filter((e) => e?.doctor?._id === user?.id).reduce(
        (acc, e) => ({ ...acc, [e.user._id]: e.user }),
        {}
      )
    );
  }

  const mappedData = AllPat.map((item, index) => ({
    ...item,
    index: AllPat.length - index - 1,
  })).reverse();

  const actions = (res) => [
    {
      label: 'View',
      icon: 'eva:eye-outline',
      key: `action-${res?._id}`,
      onClick: (res) => {
        navigate(`/doctor/patients/${res._id}`);
      },
    },
  ];

  const columns = [
    { id: 'sn', label: 'S/N', render: (rowData) => rowData.index + 1 },
    {
      id: 'fullname',
      label: 'Full Name',
      render: (rowData) => rowData?.fullname,
    },
    {
      id: 'email',
      label: 'Email',
      render: (rowData) => rowData?.email,
    },
    {
      id: 'role',
      label: 'Role',
      render: (rowData) => rowData?.role,
    },

    {
      id: 'hmo',
      label: 'HMO',
      render: (rowData) => rowData?.hmo,
    },
    {
      id: 'status',
      label: 'Status',
      render: (rowData) => (
        <StatusColor status={rowData.status} color={'#a661da'} bg={'rgba(166, 97, 218,0.1)'} />
      ),
    },
    { id: '' },
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
              Patients{' '}
            </Typography>
          </Stack>

          <TablePage data={mappedData} columns={columns} actions={actions()} />
        </Container>
      </Layout>
    </>
  );
};

export default AllPatients;
