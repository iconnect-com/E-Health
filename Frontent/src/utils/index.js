import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { getLoginToken } from '../storage';
// import { AxiosError } from "axios";

const SERVER_ERROR = 'There was an error contacting the server.';
const LoginError = 'Invalid Email or Password';
const UPDATE_PROFILE_ERROR = 'Please update your profile with a valid address and phone number.';

const DELETE_USER = 'User deleted successfully';

export const getDecodedJWT = () => {
  try {
    const token = getLoginToken();
    const decoded = jwtDecode(token);
    return decoded;
  } catch (e) {
    return null;
  }
};

export const isAuthenticated = () => {
  try {
    const decode = getDecodedJWT();
    if (decode) {
      const { exp } = decode;
      const currentTime = Date.now() / 1000;
      return exp > currentTime;
    }
    return false;
  } catch (e) {
    return false;
  }
};

export const toastOptions = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 3000,
  draggable: false,
  pauseOnHover: false,
  style: {
    zIndex: '9999',
    backgroundColor: '#333',
    color: '#fff',
  },
  hideProgressBar: true,
};

export const toastAppoint = {
  position: toast.POSITION.TOP_CENTER,
  draggable: false,
  pauseOnHover: false,
  closeOnClick: true,
  autoClose: 10000,

  style: {
    zIndex: '9999',
    backgroundColor: '#333',
    color: '#fff',
  },
  hideProgressBar: false,
};

export const successAlert = (msg) => {
  toast.success(msg || 'Successfully created', toastOptions);
};

export const paymentAlert = (msg) => {
  toast.info(
    msg || 'Please do not refresh this page to avoid disrupting the payment process',
    toastAppoint
  );
};

export const errLoginAlert = (msg) => {
  toast.error(msg || 'Successfully created', toastOptions);
};

export const errorAlert = (error) => {
  const err =
    error?.response?.data?.detail || error?.response?.data
      ? error?.response?.data?.detail || error?.response?.data?.error
      : SERVER_ERROR;
  toast.error(err, toastOptions);
};
export const infoAlert = (msg) => {
  toast.info(msg || 'Info Notification !', toastOptions);
};

export const errorProfile = (error) => {
  const err =
    error?.response?.data?.detail || error?.response?.data
      ? error?.response?.data?.detail || error?.response?.data?.error
      : UPDATE_PROFILE_ERROR;
  toast.error(err, toastOptions);
};

export const deleteUser = (error) => {
  const success =
    error?.response?.data?.detail || error?.response?.data
      ? error?.response?.data?.detail || error?.response?.data?.error
      : DELETE_USER;
  toast.success(success, toastOptions);
};

export const LoginErr = (error) => {
  const err = error?.data?.detail || error?.data ? error?.data?.detail || error?.data : LoginError;
  toast.error(err, toastOptions);
};

// STUB: convert image to base64
export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl?.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}
