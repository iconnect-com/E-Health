import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

ProductListAdmin.propTypes = {
  products: PropTypes.array,
};

export default function ProductListAdmin({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products?.map((product) => (
        <Grid key={product._id} item xs={12} sm={6} md={3}>
          <Link to={`/app/pharmacy/${product?._id}`}>
            <ShopProductCard product={product} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
