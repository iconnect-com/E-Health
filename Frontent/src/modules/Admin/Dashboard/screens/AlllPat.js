import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Stack, Typography } from '@mui/material';
import { useGetAllUser } from '../../../Auth/hooks';
import Layout from '../../../../layouts/dashboard/DashboardLayout';
import { useNavigate } from 'react-router-dom/dist';
import StatusColor from '../../../../components/StatusColor';
import Iconify from '../../../../components/iconify';
import TablePage from '../../../../components/TablePage';

const AllPatients = ({ propId, res }) => {
  const { id } = useParams();
  const limit = 1000;
  const initialPage = 1;
  const { data: AllUsers } = useGetAllUser(propId || id, limit, initialPage);
  const USERS = AllUsers?.data?.filter((u) => u?.role === 'Patient') || [];
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const mappedData = USERS?.map((item, index) => ({
    ...item,
    index: USERS?.length - index - 1,
  })).reverse();

  const actions = (res) => [
    {
      label: 'View',
      icon: 'eva:eye-outline',
      key: `action-${res?._id}`,
      onClick: (res) => {
        navigate(`/app/users/patients/${res._id}`);
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
      id: 'isApproved',
      label: 'Approval Status',
      render: (rowData) => (
        <StatusColor status={rowData.isApproved} color={'#a661da'} bg={'rgba(166, 97, 218,0.1)'} />
      ),
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
              All Patients{' '}
            </Typography>
          </Stack>

          <TablePage data={mappedData} columns={columns} actions={actions()} />
        </Container>
      </Layout>
    </>
  );
};

export default AllPatients;
