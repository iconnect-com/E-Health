import { Box, Button, Container, Stack } from '@mui/material';
import React, { useCallback, useContext } from 'react';
import { CartCard } from '../components/CartCard';
import { useNavigate } from 'react-router-dom/dist';
import { usePaystackPayment } from 'react-paystack';
import { LoadingButton } from '@mui/lab';
import { useQueryClient } from '@tanstack/react-query';
import { EmptyCart } from '../components/EmptyCart';
import { formatAmount } from '../../../../../utils/formatAmount';
import { useIsUser } from '../userCart';
import { queryKeys } from '../../../../../react-query/constants';
import { AuthContext } from '../../../../../context';
import Layout from '../../../../../layouts/dashboard/DashboardLayout';
import Iconify from '../../../../../components/iconify';

const CartPage = () => {
  const { cart, user, setCart, setIsSignIn } = useContext(AuthContext);
  const { createOrder, isLoading } = useIsUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  const amount = useCallback(
    () => cart.map((it) => it.price).reduce((a, b) => Number(a) + Number(b), 0),
    [cart]
  );

  const init = usePaystackPayment({
    amount: Number(amount()) * 100,
    email: user?.email,
    label: 'Bulk purchase',
    publicKey: process.env.PAYSTACK_PUBLIC_KEY,
  });
  const data = {
    price: amount(),
    email: user?.email,
    items: cart.map((it) => ({ type: 'Drugs', source: it._id, Image })),
  };

  return (
    <Layout name="Pharmacy" title="Pharmacy">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button
            variant="text"
            onClick={handleGoBack}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            sx={{ mb: 2 }}
          >
            Go Back{' '}
          </Button>
        </Stack>
        <Box position="relative" width="100%" height="70vh" className="background-image">
          <Box
            className="center"
            height="50%"
            width="80%"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Box py={2.5} fontSize="26px" component="span" fontWeight="bold">
              Cart
            </Box>
            <Box py={1.5} fontWeight="bold">
              {cart?.length > 1 ? `${cart?.length} courses` : `${cart?.length} course`}
              &nbsp;in the cart
            </Box>

            <br></br>

            <Box
              display="flex"
              px={2.5}
              gap={2}
              marginLeft={15}
              flexDirection="column"
              justifyContent="space-between"
              sx={{ background: '#fff' }}
              boxShadow={(theme) => theme.shadows[0]}
              width="80%"
            >
              <Box
                width="100%"
                display="flex"
                alignContent="center"
                justifyContent="center"
                flexDirection="column"
                py={1.5}
              >
                {cart?.length > 0 ? (
                  cart?.map((item) => <CartCard item={item} key={item?._id} />)
                ) : (
                  <EmptyCart />
                )}
              </Box>

              <Box
                width="100%"
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                sx={{ bgcolor: 'secondary.main' }}
                p={2}
                boxSizing="border-box"
                color="#fff"
              >
                <Box width="100%">
                  <Box
                    my={2}
                    justifyContent="space-between"
                    gap={2}
                    display="flex"
                    alignItems="center"
                    width="80%"
                    mx="auto"
                  >
                    <Box fontSize="26px" component="span" fontWeight="bold">
                      Sub Total
                    </Box>
                    <Box fontSize="26px" component="span" fontWeight="bold">
                      ₦{formatAmount(amount()?.toString())}
                    </Box>
                  </Box>
                  <LoadingButton
                    variant="contained"
                    color="primary"
                    loading={isLoading}
                    fullWidth
                    sx={{ height: '55px', fontSize: '18px' }}
                    onClick={() => {
                      if (!amount()) return;
                      if (user) {
                        createOrder(data).then((res) => {
                          init(
                            (ref) => {
                              createOrder({
                                ...data,
                                status: 'Completed',
                                paymentReference: ref.reference,
                                isPaid: true,
                              }).then(() => {
                                queryClient.invalidateQueries(queryKeys.user);
                                localStorage.setItem('cart', JSON.stringify([]));
                                setCart([]);
                                navigate(`/dashboard`);
                              });
                            },
                            () => {
                              createOrder({
                                ...data,
                                status: 'Failed',
                              });
                            }
                          );
                        });
                      } else {
                        setIsSignIn(true);
                      }
                    }}
                  >
                    Place order
                  </LoadingButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default CartPage;
