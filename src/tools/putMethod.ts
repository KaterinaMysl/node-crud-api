import { IncomingMessage, ServerResponse } from 'http';
import { User } from '../type/type';
import { checkUUID } from '../utils/checkValidUUID';
import { checkValidUserData } from '../utils/checkVakidUserData';
import { sendResponse } from '../tools/sendResponse';

export const putMethodHandler = (
  endpoint: string,
  users: User[],
  request: IncomingMessage,
  response: ServerResponse): void => {
  try {
    const id = endpoint.split('/')[2];
    if (id) {
      const isUUID = checkUUID(id);
      if (isUUID) {
        let requestBody = '';

        request.on('data', (chunk) => {
          requestBody += chunk;
        });

        request.on('end', () => {
          const currentUser = users.find((user) => user.id === id);
          if (currentUser) {
            const isUserDataValid = checkValidUserData(requestBody);
            if (isUserDataValid) {
              const { username, age, hobbies } = JSON.parse(requestBody);
              currentUser.username = username;
              currentUser.age = age;
              currentUser.hobbies = hobbies;

              sendResponse(200, response, currentUser);
            } else {
              sendResponse(
                400,
                response,
                { message: 'The request does not contain required parameters or the parameters are incorrect' }
              );
            }
          } else {
            sendResponse(404, response, { message: 'User doesn\'t exist' });
          } 

        });
      } else {
        sendResponse(400, response, { message: 'Invalid user ID' });
      }
    } else {
      sendResponse(400, response, { message: 'A specific user ID is required' });
    }
  } catch {
    sendResponse(500, response, { message: 'Internal server error' });
  }
};