import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../../axios-Instance';
import { errorAlert } from '../../../../utils';

const createOrder = async (data) => {
  const result = await axiosInstance.post('order', data);

  return result.data;
};

export const useIsUser = () => {
  const { mutateAsync, isLoading, data } = useMutation({
    mutationFn: (data) => createOrder(data),
    onError(err) {
      errorAlert(err);
    },
  });
  return { createOrder: mutateAsync, isLoading, result: data };
};

// Function to calculate the increased price
export function calculateIncreasedPrice(price, increasePercent) {
  return price * (1 + increasePercent / 100);
}

// Function to display the original and increased prices
export function displayPrices(originalPrice, increasedPrice) {
  return `NGN${increasedPrice.toFixed(2)} NGN${originalPrice.toFixed(2)}`;
}
