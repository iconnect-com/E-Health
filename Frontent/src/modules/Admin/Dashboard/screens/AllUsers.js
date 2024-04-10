import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Stack, Button, Container, Typography } from '@mui/material';
import Iconify from '../../../../components/iconify';
import DashboardLayout from '../../../../layouts/dashboard/DashboardLayout';
import { useGetAllUser } from '../../../Auth/hooks';
import StatusColor from '../../../../components/StatusColor';
import BulkUploadModal from '../../../../components/Modal Bulk Upload';
import UserTablePage from '../../../../components/Table User/user/view/Table-user';

const AllUsers = ({ propId, res }) => {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const limit = 1000; // Set your desired page size
  const { data: AllUsers, getNextPage, getPrevPage } = useGetAllUser(propId || id, limit);
  const USERS =
    AllUsers?.data?.filter(
      (u) => u?.role === 'Patient' || u?.role === 'Doctor' || u?.role === 'Admin'
    ) || [];
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const mappedData = USERS?.map((item, index) => ({
    ...item,
    index: USERS?.length - index - 1,
  })).reverse();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const actions = (res) => [
    {
      label: 'View',
      icon: 'eva:eye-outline',
      key: `action-${res?._id}`,
      onClick: (res) => {
        navigate(`/app/users/all/${res._id}`);
      },
    },
  ];

  const columns = [
    { id: '' },
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
      <DashboardLayout name="All Users" title="Appappointments">
        <Container maxWidth="xl">
          <Button
            variant="text"
            onClick={handleGoBack}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            sx={{ mb: 1 }}
          >
            Go Back{' '}
          </Button>

          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
            <Typography variant="h7" gutterBottom>
              All Users{' '}
            </Typography>
            <Button
              startIcon={<Iconify icon="eva:plus-fill" />}
              variant="contained"
              sx={{ marginRight: 5 }}
              onClick={handleOpenModal}
            >
              Bulk Upload{' '}
            </Button>
          </Stack>
          <BulkUploadModal open={openModal} handleClose={handleCloseModal} />

          <UserTablePage
            data={mappedData}
            getNextPage={getNextPage}
            getPrevPage={getPrevPage}
            columns={columns}
            actions={actions()}
          />
        </Container>
      </DashboardLayout>
    </>
  );
};
export default AllUsers;
