import {
  Timeline,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import { Avatar, Box, Card, CardHeader, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import { ImageURL } from '../../axios-Instance/constants';
import useCountdown from '../../utils/useCountdown';

export default function AnalyticsOrderTimeline({ app, title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Timeline
        sx={{
          m: 0,
          p: 4,
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 1,
          },
        }}
      >
        {list?.map((item, index) => (
          <OrderItem key={item.id} item={item} lastTimeline={index === list.length - 1} />
        ))}
      </Timeline>
    </Card>
  );
}

OrderItem.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array,
};

function OrderItem({ item, isLast }) {
  const { index, app } = item;
  const countdown = useCountdown(app?.appointment_date);
  const DocPicture = app?.doctor?.photo ? ImageURL + app?.doctor?.photo : '';

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={
            (index === 1 && 'primary') ||
            (index === 2 && 'success') ||
            (index === 3 && 'info') ||
            (index === 4 && 'warning') ||
            (index === 5 && 'secondary') ||
            'error'
          }
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 2,
            justifyContent: 'space-between',
          }}
        >
          <Avatar src={DocPicture} sx={{ width: 50, height: 50 }} />
          <Box
            sx={{
              alignItems: 'center',
              marginLeft: 3,
              borderRadius: 0,
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h7" component="div">
                {app?.appointment_type?.name}
              </Typography>

              <Typography variant="body2">{app?.doctor?.fullname}</Typography>
              <Typography variant="body2">
                <Typography component="span" sx={{ color: 'red' }}>
                  {countdown}
                </Typography>{' '}
                Hours to go
              </Typography>
            </Box>
          </Box>
        </Box>
      </TimelineContent>
    </TimelineItem>
  );
}
