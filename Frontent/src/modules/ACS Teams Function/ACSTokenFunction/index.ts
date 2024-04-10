global.AbortController = require('abort-controller');
const { CommunicationIdentityClient } = require('@azure/communication-identity');

module.exports = async function (context, req) {
  const connectionString = process.env.ACS_CONNECTION_STRING;
  let tokenClient = new CommunicationIdentityClient(connectionString);
  const user = await tokenClient.createUser();
  const userToken = await tokenClient.getToken(user, ['voip']);
  context.res = {
    body: { userId: user.communicationUserId, ...userToken },
  };
};
