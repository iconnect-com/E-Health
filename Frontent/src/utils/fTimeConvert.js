export const fTimeConvert = (time) => {
  // Create a new Date object at today's date and the provided time
  const date = new Date(`1970-01-01T${time}:00`);

  // Convert to 12-hour format with AM/PM
  const time12Hour = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return time12Hour;
};
