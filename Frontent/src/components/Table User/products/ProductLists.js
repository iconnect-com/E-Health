import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

ProductListing.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductListing({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products?.map((product) => (
        <Grid key={product._id} item xs={12} sm={8} md={2}>
          <Link to={`/app/pharmacy/${product?._id}`}>
            <ShopProductCard product={product} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
