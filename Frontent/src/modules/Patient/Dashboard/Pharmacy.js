import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../layouts/dashboard/DashboardLayout';
import { Stack, Typography, Container, Button } from '@mui/material';
import { ProductList } from '../../../components/Table User/products';
import { useGetAllDrugs } from '../../Admin/hooks';
import { ImageURL } from '../../../axios-Instance/constants';
import Iconify from '../../../components/iconify';

const Pharmacy = ({ propId, res }) => {
  const navigate = useNavigate();
  const PRODUCTLIST = useGetAllDrugs();

  const products = PRODUCTLIST?.data?.map((drug) => ({
    ...drug,
    image: drug?.image ? ImageURL + drug?.image[0] : null,
  }));

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
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
              Pharmacy
            </Typography>
          </Stack>

          <ProductList products={products} key={products?.id} />

          {/* <ProductCartWidget onClick={() => navigate('/patient/pharmacy/cart')} /> */}
        </Container>
      </Layout>
    </>
  );
};

export default Pharmacy;
