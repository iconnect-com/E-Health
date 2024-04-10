import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context';
import { useGetallAppointment } from '../modules/Patient/Hooks';
import { useGetAllUsers } from '../modules/Auth/hooks';
import { useGetAllDrugs, useGetAllReport } from '../modules/Admin/hooks';

export const AllUsers = ({ propId, res }) => {
  const { id } = useParams();
  const { data: allUsers } = useGetAllUsers(propId || id);

  return { total: allUsers?.length };
};

export const AllPatientDoc = ({ propId, res }) => {
  const { user } = useContext(AuthContext);
  const Appoints = useGetallAppointment();
  const AllA = Appoints?.data;

  let AllPat = [];
  if (AllA) {
    AllPat = Object.values(
      AllA.filter((e) => e?.doctor?._id === user?.id).reduce(
        (acc, e) => ({ ...acc, [e.user._id]: e.user }),
        {}
      )
    );
  }

  return { total: AllPat.length };
};

export const AllPatient = ({ propId, res }) => {
  const { id } = useParams();
  const { data: allUsers } = useGetAllUsers(propId || id);
  const AllPat = allUsers?.filter((users) => users?.role === 'Patient');

  return { total: AllPat?.length };
};

export const AllDoc = ({ propId, res }) => {
  const { id } = useParams();
  const { data: allUsers } = useGetAllUsers(propId || id);
  const AllDocs = allUsers?.filter((users) => users?.role === 'Doctor');

  return { total: AllDocs?.length };
};
export const AllAdmins = ({ propId, res }) => {
  const { id } = useParams();
  const { data: allUsers } = useGetAllUsers(propId || id);
  const AllDocs = allUsers?.filter((users) => users?.role === 'Admin');

  return { total: AllDocs?.length };
};

export const useCompleted = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const Appoint = useGetallAppointment(id);
  const allAppappointments = Appoint?.data || [];
  const appointmentMe = user?.id;

  const TotalMe = allAppappointments?.filter(
    (appointment) => appointment?.user?._id === appointmentMe && appointment?.status === 'Completed'
  );

  return { total: TotalMe?.length };
};

export const useReportCount = () => {
  const { user } = useContext(AuthContext);
  const Appoints = useGetAllReport();
  const AllA = Appoints?.data;
  const AllPat = AllA?.filter((e) => e?.user?._id === user?.id && e?.status === 'Completed');

  return { total: AllPat?.length };
};

export const usePatientAppCalendar = () => {
  const { user } = useContext(AuthContext);
  const Appoints = useGetallAppointment();
  const AllA = Appoints?.data;
  const AllPat = AllA?.filter((e) => e?.user?._id === user?.id && e?.status === 'Confirmed');

  return { total: AllPat };
};

export const usePatientAppPend = () => {
  const { user } = useContext(AuthContext);
  const Appoints = useGetallAppointment();
  const AllA = Appoints?.data;
  const AllPat = AllA?.filter((e) => e?.user?._id === user?.id && e?.status === 'Pending') || [];

  return { total: AllPat?.length };
};

export const usePatientAppConfirmed = () => {
  const { user } = useContext(AuthContext);
  const Appoints = useGetallAppointment();
  const AllA = Appoints?.data;
  const AllPat = AllA?.filter((e) => e?.user?._id === user?.id && e?.status === 'Confirmed');

  return { AllPat };
};

export const useCount4PatientApp = () => {
  const { user } = useContext(AuthContext);
  const Appoints = useGetallAppointment();
  const AllA = Appoints?.data;
  const AllPat = AllA?.filter((e) => e?.user?._id === user?.id && e?.status === 'Confirmed');
  return { total: AllPat?.length };
};

export const usePatientAppCompleted = () => {
  const { user } = useContext(AuthContext);
  const Appoints = useGetallAppointment();
  const AllA = Appoints?.data;
  const AllPat = AllA?.filter((e) => e?.user?._id === user?.id && e?.status === 'Completed');

  return { total: AllPat?.length };
};

export const usePatientApp = () => {
  const { user } = useContext(AuthContext);
  const Appoints = useGetallAppointment();
  const AllA = Appoints?.data;
  const AllPat = AllA?.filter((e) => e?.user?._id === user?.id && e?.status === 'Completed');

  return { total: AllPat?.length };
};

//-----------------PHARMACY-----------------
export const useDrugCount = () => {
  const DRUGS = useGetAllDrugs();
  const ALLDRUGS = DRUGS?.data || [];

  return { total: ALLDRUGS?.length };
};

export const useMedication = () => {
  const { user } = useContext(AuthContext);
  const APPappointments = useGetallAppointment();

  const medic =
    APPappointments?.data?.filter((appointment) => appointment?.user === user?.id) || [];

  return { medic };
};

//-------------DOCTOR'S DASHBOBOARD----------

export const useDocAppointment = () => {
  const { user } = useContext(AuthContext);
  const APPappointments = useGetallAppointment();

  const medic =
    APPappointments?.data?.filter(
      (appointment) => appointment?.doctor === user?.id && appointment?.status === 'Approved'
    ) || [];

  return { total: medic?.length };
};

export const useDocWait = () => {
  const { user } = useContext(AuthContext);
  const Appoints = useGetallAppointment();
  const AllA = Appoints?.data;

  const AllPat = AllA?.filter((e) => e?.doctor?._id === user?.id && e?.status === 'Pending');

  return { total: AllPat?.length };
};

export const useDoctorAppCompleted = () => {
  const { user } = useContext(AuthContext);
  const Appoints = useGetallAppointment();
  const AllA = Appoints?.data;
  const AllPat = AllA?.filter((e) => e?.doctor?._id === user?.id && e?.status === 'Completed');

  return { total: AllPat?.length };
};

export const useDocEngaged = () => {
  const { user } = useContext(AuthContext);
  const Appoints = useGetallAppointment();
  const AllA = Appoints?.data;
  const AllPat = AllA?.filter((e) => e?.doctor?._id === user?.id && e?.status === 'Confirmed');
  return { total: AllPat?.length };
};

export const useDocCalendar = () => {
  const { user } = useContext(AuthContext);
  const Appoints = useGetallAppointment();
  const AllA = Appoints?.data;
  const AllPat = AllA?.filter((e) => e?.doctor?._id === user?.id && e?.status === 'Confirmed');

  return { total: AllPat };
};

export const useDocCompleted = () => {
  const { user } = useContext(AuthContext);
  const APPappointments = useGetallAppointment();

  const medic =
    APPappointments?.data?.filter(
      (appointment) => appointment?.doctor === user?.id && appointment?.status === 'Completed'
    ) || [];

  return { total: medic?.length };
};

//-------------ADMIN'S DASHBOBOARD----------
export const useAllAppoint = () => {
  const APPappointments = useGetallAppointment();

  const medic = APPappointments?.data?.filter((appointment) => appointment) || [];

  return { total: medic?.length };
};

export const usePendAppoint = () => {
  const APPappointments = useGetallAppointment();
  const medic =
    APPappointments?.data?.filter((appointment) => appointment?.status === 'Pending') || [];

  return { total: medic?.length };
};

export const useCompdAppoint = () => {
  const APPappointments = useGetallAppointment();

  const medic =
    APPappointments?.data?.filter((appointment) => appointment?.status === 'Completed') || [];

  return { total: medic?.length };
};

export const useConfirmAppoint = () => {
  const APPappointments = useGetallAppointment();

  const medic =
    APPappointments?.data?.filter((appointment) => appointment?.status === 'Confirmed') || [];

  return { total: medic?.length };
};

export const useRectedAppoint = () => {
  const APPappointments = useGetallAppointment();

  const medic =
    APPappointments?.data?.filter((appointment) => appointment?.status === 'Rejected') || [];

  return { total: medic?.length };
};

export const useAudit = () => {
  const AUDITS = useGetAllReport();
  const AUDIT = AUDITS?.data?.filter((audits) => audits) || [];

  return { total: AUDIT?.length };
};
