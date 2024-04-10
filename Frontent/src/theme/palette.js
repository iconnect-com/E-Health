import { alpha } from '@mui/material/styles';

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

const NAVCOLOR = {
  0: '#DAEAFF',
  100: '#257CFE',
};
const BORDER = {
  60: '#F5F9FD',
  100: '#257CFE',
};

const PRIMARY = {
  lighter: '#D1E9FC',
  light: '#76B0F1',
  main: '#2065D1',
  dark: '#103996',
  darker: '#061B64',
  contrastText: '#fff',
};

const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
  darker: '#091A7A',
  contrastText: '#fff',
};

const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
  contrastText: '#fff',
};

const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
  contrastText: GREY[800],
};

const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
  contrastText: GREY[800],
};

const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
  contrastText: '#fff',
};

const ERRORS = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#74D62C',
  dark: '#330033',
  darker: '#1a001a',
  contrastText: '#fff',
};

const WHITE = {
  lighter: '#FFFFFF',
  light: '#FFFFFF',
  main: '#FFFFFF',
  dark: '#FFFFFF',
  darker: '#FFFFFF',
  contrastText: '#FFFFFF',
};

const palette = {
  common: { black: '#000', white: '#fff' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  white: WHITE,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  errors: ERRORS,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  text: {
    primary: GREY[800],
    secondary: GREY[600],
    white: '#fff',
    disabled: GREY[500],
    whyte: '#fff',
  },
  background: {
    paper: '#fff',
    default: GREY[100],
    neutral: GREY[200],
  },
  action: {
    active: NAVCOLOR[100],
    hover: alpha(NAVCOLOR[100], 0.05),
    border: alpha(BORDER[60], 1),
    selected: alpha(NAVCOLOR[100], 1.0),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(NAVCOLOR[100], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;
