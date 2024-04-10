import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import createNewMeetingAsync from '../Shared/graph';

let teamsMeetingLink;

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest) {
  context.log('Request received');
  const userId = process.env.USER_ID;
  context.log('User IDDD', userId);

  context.log('UserId coming in', userId);

  teamsMeetingLink = await createNewMeetingAsync(userId);
  const body = JSON.stringify(teamsMeetingLink);
  const meeting = JSON.parse(body);
  context.log('meeting updates:', meeting);

  context.res = {
    body: meeting.onlineMeeting.joinUrl,
  };
};

export default httpTrigger;
