import { axiosInstance } from '../../../axios-Instance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { errorAlert, successAlert, toastOptions } from '../../../utils';
import { getLoginToken } from '../../../storage';
import { queryKeys } from '../../../react-query/constants';
import { toast } from 'react-toastify';

//--------------------PHARMACY--------------------------

async function addDrug(formData) {
  const data = await axiosInstance({
    url: '/pharmacy',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useAddDrug() {
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => addDrug(formData),
    onSuccess: () => {
      successAlert('Drug Uploaded Successfully');
    },
    onError: (error) => {
      errorAlert(error);
    },
  });

  return { mutate, isError, error, isSuccess, reset, data };
}

async function bulkUpload(formData) {
  const data = await axiosInstance({
    url: '/auth/register-users-from-excel',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useBulkUpload() {
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => bulkUpload(formData),
    onSuccess: () => {
      successAlert('Bulk Upload Successful');
    },
    onError: (error) => {
      errorAlert(error);
    },
  });

  return { mutate, isError, error, isSuccess, reset, data };
}

async function deletelDrug(id) {
  const data = await axiosInstance({
    url: '/pharmacy/:id',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

async function getAllDrugs(id) {
  const data = await axiosInstance({
    url: '/pharmacy',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

async function getDrugById(id) {
  const data = await axiosInstance({
    url: '/pharmacy/:id',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useDeletelDrug() {
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => deletelDrug(formData),
    onSuccess: (data) => {
      successAlert('Drug Deleted Successful');
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isError, error, isSuccess, reset, data };
}

export function useGetAllDrugs() {
  const fallback = {};
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.drugs],
    queryFn: () => getAllDrugs(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

export function useGetDrugById() {
  const fallback = {};
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.drugs],
    queryFn: () => getDrugById(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

//--------------------REPORTS--------------------------

async function getAllReport() {
  const data = await axiosInstance({
    url: '/report',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useGetAllReport() {
  const fallback = {};
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.report],
    queryFn: () => getAllReport(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}
async function getReportById(id) {
  const data = await axiosInstance({
    url: '/report/:id',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useGetReportById() {
  const fallback = {};
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.report],
    queryFn: () => getReportById(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

async function getReportByUserId(id) {
  const data = await axiosInstance({
    url: '/report/eachpatient/:id',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useGetReportByUserId() {
  const fallback = {};
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.report],
    queryFn: () => getReportByUserId(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}
async function getCountOfReport(id) {
  const data = await axiosInstance({
    url: '/report/medicalreport/:id',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useGetCountOfReport() {
  const fallback = {};
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.report],
    queryFn: () => getCountOfReport(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

async function addReport(formData) {
  const data = await axiosInstance({
    url: '/report',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useAddReport() {
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => addReport(formData),
    onSuccess: (data) => {
      successAlert('Report Added Successful');
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isError, error, isSuccess, reset, data };
}

async function deleteReport(id) {
  const data = await axiosInstance({
    url: '/report',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useDeleteReport() {
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => deleteReport(formData),
    onSuccess: (data) => {
      successAlert('Report Deleted Successful');
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isError, error, isSuccess, reset, data };
}

//--------------------ORDERS--------------------------

async function getAllOrders() {
  const data = await axiosInstance({
    url: '/order',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useGetAllOrders() {
  const fallback = {};
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.order],
    queryFn: () => getAllOrders(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}
async function getOrderById(id) {
  const data = await axiosInstance({
    url: '/order/:id',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useGetOrderById() {
  const fallback = {};
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.report],
    queryFn: () => getOrderById(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}
async function getDrugsOrderById(id) {
  const data = await axiosInstance({
    url: '/order/get/userorders/:id',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useGetDrugsOrderById() {
  const fallback = {};
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.report],
    queryFn: () => getDrugsOrderById(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

async function getCountOfDrug(id) {
  const data = await axiosInstance({
    url: '/order/pharmacy/:id',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useGetCountOfDrug() {
  const fallback = {};
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.report],
    queryFn: () => getCountOfDrug(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

async function addOrder(formData) {
  const data = await axiosInstance({
    url: '/order',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useAddOrder() {
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => addOrder(formData),
    onSuccess: (data) => {
      successAlert('Order Submitted Successful');
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isError, error, isSuccess, reset, data };
}

async function deleteOrder(id) {
  const data = await axiosInstance({
    url: '/order',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useDeleteOrder() {
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => deleteOrder(formData),
    onSuccess: (data) => {
      successAlert('Order Removed Successful');
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isError, error, isSuccess, reset, data };
}

// Appointment Types

async function getAppType() {
  const data = await axiosInstance({
    url: '/appointmenttype',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useGetAppType() {
  const fallback = {};
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.appointtype],
    queryFn: () => getAppType(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

async function addAppType(formData) {
  const data = await axiosInstance({
    url: '/appointmenttype',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useAddAppType() {
  const queryClient = useQueryClient();
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => addAppType(formData),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.appointtype]);
      successAlert('Appointment Type Added Successfully');
      reset();
    },
    onError: (error) => {
      errorAlert(error);
    },
  });

  return { mutate, isError, error, isSuccess, reset, data };
}

async function deleteAppType(id) {
  const data = await axiosInstance({
    url: `/appointmenttype/${id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useDeletelAppType() {
  const queryClient = useQueryClient();
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => deleteAppType(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.appointtype]);
      successAlert('Appoint Type Deleted Successful');
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isError, error, isSuccess, reset, data };
}
