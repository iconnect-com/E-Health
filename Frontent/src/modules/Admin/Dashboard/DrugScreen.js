import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../../layouts/dashboard/DashboardLayout';

import {
  Stack,
  Typography,
  Box,
  Container,
  Card,
  CardMedia,
  CardContent,
  Button,
} from '@mui/material';
import { useGetAllDrugs } from '../hooks';
import { ImageURL } from '../../../axios-Instance/constants';
import { useContext } from 'react';
import { AuthContext } from '../../../context';
import { usePaystackPayment } from 'react-paystack';
import { LoadingButton } from '@mui/lab';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { infoAlert } from '../../../utils';
import { useIsUser } from '../../Patient/Dashboard/Cart/userCart';
import Iconify from '../../../components/iconify';

const DrugScreen = ({ price, name, drugId, defaultPrice, isLoading, view = false, drug }) => {
  const { id } = useParams();
  // const [qty, setQty] = useState(1);
  const { data: PRODUCTLIST } = useGetAllDrugs();
  const DrugsID = PRODUCTLIST?.find((drug) => drug?._id === id);
  const DRUGIMG = ImageURL + DrugsID?.image[0];

  const handleGoBack = () => {
    navigate(-1);
  };
  const { user, setIsSignIn, setCart, cart } = useContext(AuthContext);
  const { createOrder, isLoading: isPaymentsLoading } = useIsUser();
  const navigate = useNavigate();

  const init = usePaystackPayment({
    amount: Number(price) * 100,
    email: user?.email,
    label: name,
    publicKey: '',
  });
  const data = {
    price,
    email: user?.email,
    items: [
      {
        type: 'Drug',
        source: drugId,
      },
    ],
  };

  const handleAddToCart = () => {
    const items = cart && cart?.length ? [...cart].map((it) => it?._id) : [];

    if (items.includes(drugId)) {
      infoAlert('Item already added to cart');
      return;
    }

    setCart((prev) => [drug, ...prev]);

    localStorage.setItem('cart', JSON.stringify([drug, ...cart]));
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
              {'Product Details'}
            </Typography>
          </Stack>

          <Card sx={{ maxWidth: 500 }}>
            <CardMedia component="img" height="300" image={DRUGIMG} alt={DrugsID?.name} />
            <CardContent>
              <Typography gutterBottom variant="h3" component="div">
                {DrugsID?.name}{' '}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                ₦{DrugsID?.price}{' '}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {DrugsID?.description ||
                  'In pharmacology, a drug is a chemical substance, typically of known structure, which, when administered to a living organism, produces a biological effect. A pharmaceutical drug, also called a medication or medicine, is a chemical substance used to treat, cure, prevent, or diagnose a disease or to promote well-being.'}
              </Typography>
            </CardContent>
            <Box sx={{ marginBottom: 3 }}>
              <>
                <LoadingButton
                  // onClick={() => {
                  //   if (user) {
                  //     createOrder(data).then((res) => {
                  //       init(
                  //         (ref) => {
                  //           createOrder({
                  //             ...data,
                  //             status: 'Completed',
                  //             paymentReference: ref.reference,
                  //             isPaid: true,
                  //           }).then(() => {
                  //             navigate('/patient/pharmacy/cart');
                  //           });
                  //         },
                  //         () => {
                  //           createOrder({
                  //             ...data,
                  //             status: 'Failed',
                  //           });
                  //         }
                  //       );
                  //     });
                  //   } else {
                  //     setIsSignIn(true);
                  //   }
                  // }}
                  startIcon={<AttachMoneyIcon />}
                  size="medium"
                  color="error"
                  variant="contained"
                  // loading={isPaymentsLoading}
                  sx={{ marginRight: 3, marginLeft: 3 }}
                >
                  Buy Now
                </LoadingButton>
                <LoadingButton
                  startIcon={<AddShoppingCartIcon />}
                  variant="contained"
                  size="medium"
                  color="secondary"
                  // onClick={handleAddToCart}
                >
                  Add to cart
                </LoadingButton>
              </>
            </Box>
          </Card>

          {/* <ProductCartWidget onClick={() => Navigate('/patient/pharmacy/cart')} /> */}
        </Container>
      </Layout>
    </>
  );
};
export default DrugScreen;
