import * as React from 'react';

const StatusColor = ({ status = '', type = undefined, colorProp = '', bgProp = '#' }) => {
  let color = colorProp;
  let bg = bgProp;
  let text = '';

  // Check if status is a boolean and convert it to a string
  if (typeof status === 'boolean') {
    text = status ? 'Approved' : 'Unapproved';
    if (!status) {
      color = '#e91e63';
      bg = 'rgba(233, 30, 99,0.1)';
    }
  }

  switch (status || type) {
    case 'Completed':
      color = '#459e49';
      bg = 'rgba(69, 158, 73,0.1)';
      break;
    case '':
      color = '#459e49';
      bg = 'rgba(69, 158, 73,0.1)';
      break;
    case 'Pending':
      color = '#FF9800';
      bg = 'rgba(255, 152, 0,0.1)';
      break;
    case 'Failed':
      color = '#e91e63';
      bg = 'rgba(233, 30, 99,0.1)';
      break;
    case 'Rejected':
      color = '#e91e63';
      bg = 'rgba(233, 30, 99,0.1)';
      break;
    case 'Confirmed':
      color = '#a661da';
      bg = 'rgba(166, 97, 218,0.1)';
      break;
    case true:
      color = '#a661da';
      bg = 'rgba(166, 97, 218,0.1)';
      text = 'Approved';
      break;
    case false:
      color = '#e91e63';
      bg = 'rgba(233, 30, 99,0.1)';
      text = 'Unapproved';
      break;
    case 'Active':
      color = '#a661da';
      bg = 'rgba(166, 97, 218,0.1)';
      break;
    case 'InActive':
      color = '#e91e63';
      bg = 'rgba(233, 30, 99,0.1)';
      break;
    default:
      break;
  }
  return (
    <span
      style={{
        color: color,
        background: bg,
        padding: '5px 15px',
        textAlign: 'center',
      }}
    >
      {status} {text} {type}
    </span>
  );
};

export default StatusColor;
