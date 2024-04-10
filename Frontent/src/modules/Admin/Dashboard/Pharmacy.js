import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../layouts/dashboard/DashboardLayout';

import { Stack, Button, Typography, Container } from '@mui/material';
import Iconify from '../../../components/iconify';

import { ProductSort, ProductListAdmin } from '../../../components/Table User/products';
import { useGetAllDrugs } from '../../Admin/hooks';
import TransitionsModal from '../../../components/Modal';
import { ImageURL } from '../../../axios-Instance/constants';

const Pharmacy = ({ propId, res }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const PRODUCTLIST = useGetAllDrugs();

  const products = PRODUCTLIST?.data?.map((drug) => ({
    ...drug,
    image: drug?.image ? ImageURL + drug?.image[0] : null,
  }));

  const handleGoBack = () => {
    navigate(-1);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Layout name="Pharmacy" title="Pharmacy">
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
            Pharmacy Store
          </Typography>
          <Button
            variant="contained"
            sx={{ marginRight: 8 }}
            onClick={handleOpenModal}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Drug
          </Button>
        </Stack>
        <TransitionsModal open={openModal} handleClose={handleCloseModal} />

        <ProductListAdmin products={products} key={products?.id} />
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductSort />
          </Stack>
        </Stack>
      </Container>
    </Layout>
  );
};

export default Pharmacy;
