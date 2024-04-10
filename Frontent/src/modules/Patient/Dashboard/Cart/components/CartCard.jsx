import React, { useContext } from 'react';
import { FaTrash } from 'react-icons/fa';
import { formatAmount } from '../../../../../utils/formatAmount';
import { Box, IconButton, Grid, CardMedia } from '@mui/material';
import Images from '../../../../../assets/covers/cover_10.jpg';
import { AuthContext } from '../../../../../context';

export const CartCard = ({ item }) => {
  const { setCart, cart } = useContext(AuthContext);
  const previewVideo = item?.previewVideo;

  return (
    <Box
      position="relative"
      width="100%"
      height="100%"
      boxSizing="border-box"
      my={2}
      borderTop="1px solid #ccc"
      pt={2}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={1} alignItems="center">
          <Grid item md={5}>
            {previewVideo || <CardMedia component="img" image={Images} />}
          </Grid>
          <Box marginLeft={3} fontWeight={600}>
            {item?.title}
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={3} marginRight={3}>
          <Box fontWeight={600}>₦{formatAmount(item?.price?.toString(), false)}</Box>
          <IconButton
            onClick={() => {
              setCart((prev) => prev.filter((it) => it._id !== item._id));
              localStorage.setItem(
                'cart',
                JSON.stringify(cart.filter((it) => it._id !== item._id))
              );
            }}
            color="error"
          >
            <FaTrash fontSize="12px" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
