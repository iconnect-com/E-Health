// useCountdown.js
import { useState, useEffect } from 'react';

export default function useCountdown(appointmentDate) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const appointmentDateObj = new Date(appointmentDate);

      const diffInMilliseconds = appointmentDateObj - now;

      if (diffInMilliseconds <= 0) {
        clearInterval(interval); // Stop the interval
        setTimeLeft('PAST'); // Set timeLeft to 'PAST'
        return;
      }

      const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
      const hours = Math.floor(diffInSeconds / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = diffInSeconds % 60;

      setTimeLeft(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(interval); // cleanup on component unmount
  }, [appointmentDate]);

  return timeLeft;
}
