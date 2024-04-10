import { Link, useNavigate } from 'react-router-dom';
import {
  Grid,
  Typography,
  Button,
  Card,
  Select,
  MenuItem,
  IconButton,
  Container,
} from '@mui/material';
import { FaTrash } from 'react-icons/fa';
import Message from '../../../../components/Message';
import { useState } from 'react';
import Layout from '../../../../layouts/dashboard/DashboardLayout';

const CartScreen = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  const [cartItems, setCartItems] = useState([]); // Initialize cartItems state

  const addToCartHandler = (product, qty) => {
    setCartItems((oldCartItems) => [...oldCartItems, { ...product, qty }]);
  };

  const removeFromCartHandler = (id) => {
    setCartItems((oldCartItems) => oldCartItems.filter((item) => item._id !== id));
  };

  const checkoutHandler = () => {
    navigate('/admn/pharmacy/shipping');
  };

  return (
    <Layout name="Dashboard" title="Dashboard">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h7" gutterBottom>
              Cart
            </Typography>
            {cartItems.length === 0 ? (
              <Message>
                Your cart is currently empty <Link onClick={handleGoBack}>Go Back</Link>
              </Message>
            ) : (
              cartItems.map((item) => (
                <Grid container spacing={3} key={item._id}>
                  <Grid item xs={2}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Grid>
                  <Grid item xs={2}>
                    ${item.price}
                  </Grid>
                  <Grid item xs={2}>
                    <Select
                      value={item.qty}
                      onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <MenuItem key={x + 1} value={x + 1}>
                          {x + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton onClick={() => removeFromCartHandler(item._id)}>
                      <FaTrash />
                    </IconButton>
                  </Grid>
                </Grid>
              ))
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <Typography variant="h5">
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
              </Typography>
              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              <Button
                variant="contained"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                fullWidth
              >
                Proceed To Checkout
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default CartScreen;
