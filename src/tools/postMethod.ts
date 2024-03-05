import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../type/type';
import { sendResponse } from '../tools/sendResponse';
import { checkValidUserData } from '../utils/checkVakidUserData';

export const postMethodHandler = (
  users: User[],
  request: IncomingMessage,
  response: ServerResponse
): void => {
  try {
    let requestBody = '';

    request.on('data', (chunk) => {
      requestBody += chunk;
    });

    request.on('end', () => {
      const isUserDataValid = checkValidUserData(requestBody);
      if (isUserDataValid) {
        const { username, age, hobbies } = JSON.parse(requestBody);
        const createdUser = {
          id: uuidv4(),
          username,
          age,
          hobbies
        };
        users.push(createdUser);

        sendResponse(201, response, createdUser);
      } else {
        sendResponse(
          400,
          response,
          { message: 'The request does not contain required parameters or the parameters are incorrect' }
        );
      }
    });
  } catch {
    sendResponse(500, response, { message: 'Internal server error' });
  }
};
