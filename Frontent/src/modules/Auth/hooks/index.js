import { axiosInstance } from '../../../axios-Instance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { errLoginAlert, errorAlert, successAlert, toastOptions } from '../../../utils';
import { AuthContext } from '../../../context';
import { getLoginToken, setLoginToken } from '../../../storage';
import { useContext, useState } from 'react';
import { queryKeys } from '../../../react-query/constants';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

async function Register(formData) {
  const data = await axiosInstance({
    url: '/auth',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return data?.data;
}

export function useRegister() {
  const navigate = useNavigate();
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => Register(formData),
    onSuccess: (data) => {
      successAlert('Registration Successful');
      navigate('/login');
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isError, error, isSuccess, reset, data };
}

async function docRegister(formData) {
  const data = await axiosInstance({
    url: '/auth',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useDocRegister() {
  const navigate = useNavigate();
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => docRegister(formData),
    onSuccess: () => {
      successAlert('Registration Successful');
      navigate('/login');
    },
    onError: (error) => {
      errorAlert(error);
    },
  });

  return { mutate, isError, error, isSuccess, reset, data };
}

async function getAllUser() {
  const data = await axiosInstance({
    url: '/auth',

    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

async function changePassword(formData) {
  const data = await axiosInstance({
    url: '/auth/changepassword',
    method: 'PUT',
    data: formData,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useChangePassword() {
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => changePassword(formData),
    onSuccess: () => {
      reset();
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isError, error, isSuccess, reset, data };
}

export function useGetAllUsers() {
  const fallback = {};
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.users],
    queryFn: () => getAllUser(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

async function getAllUserCount() {
  const data = await axiosInstance({
    url: '/auth/get/totalUser',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useGetAllUserCount() {
  const fallback = {};
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.users],
    queryFn: () => getAllUserCount(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

async function getAllDoctorCount() {
  const data = await axiosInstance({
    url: '/auth/get/doctor',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useGetAllDoctorCount() {
  const fallback = {};
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.doctor],
    queryFn: () => getAllDoctorCount(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

async function getAllPatientCount() {
  const data = await axiosInstance({
    url: '/auth/get/patient',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useGetAllPatientCount() {
  const fallback = {};
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.patient],
    queryFn: () => getAllPatientCount(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

async function getAllUsers(page, limit) {
  const data = await axiosInstance({
    url: `/auth?page=1&limit=1000`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useGetAllUser(initialPage, limit) {
  const [page, setPage] = useState(initialPage);
  const fallback = {};
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.users, page],
    queryFn: () => getAllUsers(page, limit),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });

  const getNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const getPrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return { data, getNextPage, getPrevPage };
}

async function getDocList() {
  const data = await axiosInstance({
    url: `/auth/getDoctorName`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useGetDocList() {
  const fallback = {};
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.doclist],
    queryFn: () => getDocList(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

async function forgotPassword(formData) {
  const data = await axiosInstance({
    url: '/auth/resetpassword',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return data?.data;
}

export function useForgotPassword() {
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => forgotPassword(formData),
    onSuccess: () => {
      successAlert('Check your mailbox to retrieve your account');
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isError, error, isSuccess, reset, data };
}

async function getMe() {
  const data = await axiosInstance({
    url: '/auth/me',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useGetMe() {
  const fallback = {};
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.me],
    queryFn: () => getMe(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

async function updateMe(formData) {
  const data = await axiosInstance({
    url: '/auth/me',
    method: 'PUT',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useUpdateMe() {
  const queryClient = useQueryClient();

  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => updateMe(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.me]);
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isError, error, isSuccess, reset, data };
}

async function uploadProfile(id, formData) {
  try {
    const response = await axiosInstance.put(`/auth/${id}/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getLoginToken()}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export function useUploadProfile(id) {
  const queryClient = useQueryClient();
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => uploadProfile(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.me]);
      successAlert('Profile picture uploaded Successful');
    },
    onError: (error) => {
      errorAlert(error);
    },
  });

  // Return a promise that resolves when the mutation is successful
  const uploadProfilePromise = (formData) => {
    return new Promise((resolve, reject) => {
      mutate(formData, {
        onSuccess: () => {
          resolve(data);
        },
        onError: (error) => {
          reject(error);
        },
      });
    });
  };

  return { mutate, isError, error, isSuccess, reset, data, uploadProfilePromise };
}

async function DeleteUser(id) {
  const data = await axiosInstance({
    url: `/auth/${id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset, isError, error } = useMutation({
    mutationFn: (id) => DeleteUser(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.users]);
    },
  });
  return { mutate, isSuccess, reset, isError, error };
}

async function updateUser({ id, data }) {
  const response = await axiosInstance({
    url: `/auth/${id}`,
    method: 'PATCH',
    data,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return response?.data;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => updateUser(formData),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.user]);
      reset();
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isError, error, isSuccess, reset, data };
}

async function userLogin(formData) {
  const data = await axiosInstance({
    url: '/auth/login',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return data?.data;
}

export function useLogin() {
  const authCtx = useContext(AuthContext);
  const { mutate, isError, error, isSuccess, reset } = useMutation({
    mutationFn: (formData) => userLogin(formData),
    onSuccess: (data) => {
      const token = data?.token;

      if (!token) {
        errLoginAlert('User does not exist or credentials are incorrect!');
        return;
      }

      const userDetails = getUserDetailsFromToken(token);

      if (
        (userDetails?.role === 'Doctor' &&
          userDetails?.status === 'Active' &&
          userDetails?.isApproved === true) ||
        (userDetails?.role === 'Patient' && userDetails?.status === 'Active') ||
        userDetails?.role === 'Admin'
      ) {
        setLoginToken(token);
        authCtx.authenticate(token);
        successAlert('Login Successful');
      } else {
        errLoginAlert('Not allowed, account either not Active or yet to be Approved' || error);
      }
    },
    onError: (error) => {
      errLoginAlert(error?.response?.data?.error || 'An error occurred during login');
    },
  });
  return { mutate, isError, error, isSuccess, reset };
}

function getUserDetailsFromToken(token) {
  try {
    const decoded = jwt_decode(token);
    return decoded;
  } catch (err) {
    return null;
  }
}

async function resetPassword(formData) {
  const data = await axiosInstance({
    url: `/auth/forgotpassword`,
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return data?.data;
}

export function useResetPassword() {
  const { mutate, isError, error, isSuccess, reset } = useMutation({
    mutationFn: (formData) => resetPassword(formData),
  });
  return { mutate, isError, error, isSuccess, reset };
}

async function newResetPassword(formData, token) {
  const data = await axiosInstance({
    url: `/auth/resetpassword/${token}`,
    method: 'PUT',
    data: formData,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return data?.data;
}

export function useNewResetPassword() {
  const { mutate, isError, error, isSuccess, reset } = useMutation({
    mutationFn: (formData) => newResetPassword(formData, formData.token),
  });
  return { mutate, isError, error, isSuccess, reset };
}
