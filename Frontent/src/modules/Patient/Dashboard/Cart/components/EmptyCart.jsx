import { Box } from "@mui/material";
import React from "react";

export const EmptyCart = () => {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box mt={6}>Cart is empty</Box>
    </Box>
  );
};
