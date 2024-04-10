const FormattedDate = ({ date }) => {
  // Check if the date is a valid date
  if (!date || isNaN(new Date(date))) {
    return 'Invalid Date';
  }

  const parsedDate = new Date(date);
  const day = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(parsedDate);
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(parsedDate);
  const year = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(parsedDate);

  // Calculate the suffix
  const suffix = day >= 11 && day <= 13 ? 'th' : ['th', 'st', 'nd', ''][Math.min(day % 10, 3)];

  // Remove '0' prefix for days less than 10
  const formattedDay = day.replace(/^0+/, '');

  return `${formattedDay}${suffix} ${month}, ${year}`;
};

export default FormattedDate;
