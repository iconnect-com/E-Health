import { GiCalendarHalfYear, GiMedicines } from 'react-icons/gi';
import { TbReport } from 'react-icons/tb';
import { FaUserDoctor } from 'react-icons/fa6';
import { HiUsers } from 'react-icons/hi2';
import { HiUserGroup } from 'react-icons/hi2';
import { LuCalendarHeart } from 'react-icons/lu';
import { CiLogout } from 'react-icons/ci';
import { MdSpaceDashboard } from 'react-icons/md';

const navConfig = [
  {
    title: 'dashboard',
    path: '/patient/dashboard',
    icon: <MdSpaceDashboard />,
    allowed: ['Patient'],
  },
  {
    title: 'dashboard',
    path: '/doctor/dashboard',
    icon: <MdSpaceDashboard />,
    allowed: ['Doctor'],
  },
  {
    title: 'dashboard',
    path: '/app/dashboard',
    icon: <MdSpaceDashboard />,
    allowed: ['Admin'],
  },
  {
    title: 'Appointments',
    path: '/doctor/appointments',
    icon: <LuCalendarHeart />,
    allowed: ['Doctor'],
  },
  {
    title: 'Appointment',
    path: '/patient/appointment',
    icon: <LuCalendarHeart />,
    allowed: ['Patient'],
  },
  {
    title: 'Pharmacy',
    path: '/app/pharmacy',
    icon: <GiMedicines />,
    allowed: ['Admin'],
  },
  {
    title: 'Appointment Types',
    path: '/app/appointment-type',
    icon: <GiCalendarHalfYear />,
    allowed: ['Admin'],
  },
  {
    title: 'Pharmacy',
    path: '/patient/pharmacy',
    icon: <GiMedicines />,
    allowed: ['Patient'],
  },
  {
    title: 'Medical Report',
    path: '/patient/report',
    icon: <TbReport />,
    allowed: ['Patient'],
  },
  {
    title: 'KYD (Doctors)',
    path: '/patient/our-doctors',
    icon: <FaUserDoctor />,
    allowed: ['Patient'],
  },
  {
    title: 'Patients',
    path: '/app/users/patients',
    icon: <HiUsers />,
    allowed: ['Admin'],
  },
  {
    title: 'Doctors',
    path: '/app/users/doctors',
    icon: <FaUserDoctor />,
    allowed: ['Admin'],
  },
  {
    title: 'Patients',
    path: '/doctor/patients',
    icon: <HiUsers />,
    allowed: ['Doctor'],
  },
  {
    title: 'Reports',
    path: '/doctor/reports',
    icon: <TbReport />,
    allowed: ['Doctor'],
  },
  {
    title: 'All Users',
    path: '/app/users/all',
    icon: <HiUserGroup />,
    allowed: ['Admin'],
  },
  {
    title: 'Reports',
    path: '/app/reports',
    icon: <TbReport />,
    allowed: ['Admin'],
  },
  {
    title: 'Logout',
    path: '',
    icon: <CiLogout />,
    allowed: ['Patient', 'Doctor', 'Admin'],
  },
];

export default navConfig;
