import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { makeStyles } from '@mui/styles';
import { loggedInUser } from '../../storage';

const HighlightedDay = styled(PickersDay)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const useStyles = makeStyles({
  hidden: {
    '.privatedatepickertoolbar-penicon': {
      visibility: 'hidden',
    },
  },
});

const ServerDay = (Booked) => {
  const { highlightedDays = [], day: dateString, outsideCurrentMonth, ...other } = Booked;

  const day = dayjs(dateString, 'YYYY-MM-DD');
  const isSelected =
    !Booked.outsideCurrentMonth && highlightedDays.includes(day.format('YYYY-MM-DD'));

  return (
    <HighlightedDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      selected={isSelected}
    />
  );
};

const SessionBooking = ({ Booked }) => {
  const classes = useStyles();

  Booked?.forEach((date) => {
    if (!dayjs(date, 'MM-DD-YYYY').isValid()) {
    }
  });

  const initialDates = localStorage.getItem('highlightedDates')
    ? JSON.parse(localStorage.getItem('highlightedDates'))
    : Booked?.map((date) => dayjs(date, 'MM-DD-YYYY').format('YYYY-MM-DD'));
  const [highlightedDays, setHighlitedDays] = useState(initialDates);

  useEffect(() => {
    const newDates = Booked?.map((date) => dayjs(date, 'MM-DD-YYYY').format('YYYY-MM-DD'));
    setHighlitedDays(newDates);
    localStorage.setItem('highlightedDates', JSON.stringify(newDates));
  }, [Booked]);

  useEffect(() => {
    if (loggedInUser) {
      const storedDates = localStorage.getItem('highlightedDates');
      if (storedDates) {
        const parsedDates = JSON.parse(storedDates);
        setHighlitedDays(parsedDates);
      }
    }
  }, []);

  return (
    <Box className={classes.hidden}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          slots={{
            day: ServerDay,
            DatePickerToolbar: function () {
              return false;
            },
          }}
          slotProps={{
            day: {
              highlightedDays,
            },
            actionBar: {
              actions: null,
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default SessionBooking;
