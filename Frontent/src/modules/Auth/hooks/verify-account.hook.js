import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../axios-Instance";
import { errorAlert, successAlert } from "../../../utils";
import { useContext } from "react";
import { AuthContext } from "../../../context";

const verifyAccount = async (token) => {
  const res = await axiosInstance.post(`auth/activate/${token}`);
  return res.data.data;
};
const requestAccountVerification = async (id) => {
  const res = await axiosInstance.post(`auth/requestActivation/${id}`);
  return res.data.data;
};

export const useVerifyAccount = () => {
  const { setIsSignIn } = useContext(AuthContext);
  const { mutate, isLoading, data, error } = useMutation({
    mutationFn: (token) => verifyAccount(token),

    onSuccess() {
      successAlert("Account activated successfully. You can now login");
      setTimeout(() => {
        setIsSignIn(true);
      }, [1500]);
    },
    onError(err) {
      errorAlert(err);
    },
  });
  return { mutate, isLoading, data, error };
};
export const useRequestVerifyAccount = () => {
  const { user } = useContext(AuthContext);
  const { mutate, isLoading, data, error } = useMutation({
    mutationFn: () => requestAccountVerification(user?._id),

    onSuccess() {
      successAlert("Account activation request successfull. Check your email");
    },
    onError(err) {
      errorAlert(err);
    },
  });
  return { mutate, isLoading, data, error };
};
