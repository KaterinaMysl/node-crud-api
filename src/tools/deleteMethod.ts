import { ServerResponse } from 'http';
import { User } from '../type/type';
import { checkUUID } from '../utils/checkValidUUID';
import { sendResponse } from '../tools/sendResponse';

export const deleteMethodHandler = (
  endpoint: string,
  users: User[],
  response: ServerResponse): void => {
  try {
    const id = endpoint.split('/')[2];
    if (id) {
      const isValidUUID = checkUUID(id);
      if (isValidUUID) {
        const currentUserIndex = users.findIndex((user) => user.id === id);
        if (currentUserIndex !== -1) {
          users.splice(currentUserIndex, 1);
          sendResponse(204, response);
        } else {
          sendResponse(404, response, { message: 'User doesn\'t exist' });
        }
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