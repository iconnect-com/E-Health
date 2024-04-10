import { axiosInstance } from '../../../axios-Instance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { errorAlert, successAlert, toastOptions } from '../../../utils';
import { getLoginToken } from '../../../storage';
import { queryKeys } from '../../../react-query/constants';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

//---------------CONSULTATIONS-------------------------------------------------------
async function userConsult(id) {
  const data = await axiosInstance({
    url: `/appointment/${id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useUserConsult() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.consult],
    queryFn: () => userConsult(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

async function doctorConsult(id) {
  const data = await axiosInstance({
    url: `/appointment/${id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useDoctorConsult() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.consult],
    queryFn: () => doctorConsult(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

//-----------------APPappointments----------------

async function patientAppointment(id) {
  const data = await axiosInstance({
    url: `/appointment/eachpatient/${id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function usePatientAppointment() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.appointment],
    queryFn: () => patientAppointment(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

async function doctorAppointment(id) {
  const data = await axiosInstance({
    url: `/appointment/eachdoctor/${id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useDoctorAppointment() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.appointment],
    queryFn: () => doctorAppointment(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

async function getAllApps() {
  const data = await axiosInstance({
    url: '/appointment',
    method: 'GET',
  });

  return data?.data;
}

export function useGetAllApps() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.appointment],
    queryFn: () => getAllApps(),
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

async function getallAppointment() {
  const data = await axiosInstance({
    url: '/appointment',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useGetallAppointment() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.appointment],
    queryFn: () => getallAppointment(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

async function getAppointmentById(id) {
  const data = await axiosInstance({
    url: '/appointment',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useGetAppointmentById() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.appointment],
    queryFn: () => getAppointmentById(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

async function addAppointment(formData) {
  const data = await axiosInstance({
    url: '/appointment',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useAddAppointment() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => addAppointment(formData),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.appointment]);
      successAlert('Appointment added Successfully');
      reset();
      navigate('/');
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isError, error, isSuccess, reset, data };
}

async function updateAppointment({ id, data }) {
  const response = await axiosInstance({
    url: `/appointment/${id}`,
    method: 'PUT',
    data,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return response?.data;
}

export function useUpdateAppointment() {
  const queryClient = useQueryClient();
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => updateAppointment(formData),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.appointment]);
      reset();
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isError, error, isSuccess, reset, data };
}

async function updateAppToCompleted({ id, data }) {
  const response = await axiosInstance({
    url: `/appointment/${id}`,
    method: 'PUT',
    data,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return response?.data;
}

export function useUpdateAppToCompleted() {
  const queryClient = useQueryClient();
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formDataUpdate) => updateAppToCompleted(formDataUpdate),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.appointment]);
      reset();
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isError, error, isSuccess, reset, data };
}

async function deleteAppointment({ id, data }) {
  const response = await axiosInstance({
    url: `/appointment/${id}`,
    method: 'DELETE',
    data,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return response?.data;
}

export function useDeleteAppointment() {
  const queryClient = useQueryClient();
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => deleteAppointment(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.appointment]);
      reset();
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isError, error, isSuccess, reset, data };
}

//---------------REPORT-------------------------------------------------------

async function addReport(formData) {
  const data = await axiosInstance({
    url: '/report',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useAddReport() {
  const queryClient = useQueryClient();
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => addReport(formData),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries([queryKeys.report]);
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isError, error, isSuccess, reset, data };
}

// Payment Options

async function addPayments(formData) {
  const data = await axiosInstance({
    url: '/appointment/checkoutSession',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useAddPayments() {
  const [refs, setRefs] = useState();
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => addPayments(formData),
    onSuccess: (data) => {
      if (data) {
        setRefs(data);
      }
      reset();
      // navigate('/');
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isError, error, isSuccess, reset, data, refs };
}
