import React from "react";
import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import Rating from "./Rating";

const DrugCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345, m: 1 }}>
      <Link to={`/product/${product._id}`}>
        <CardMedia
          component="img"
          height="140"
          image={product.image}
          alt={product.name}
        />
      </Link>

      <CardContent>
        <Link to={`/product/${product._id}`}>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
        </Link>

        <Typography variant="h5" color="text.secondary">
          ${product.price}
        </Typography>

        <Box mt={1}>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default DrugCard;
