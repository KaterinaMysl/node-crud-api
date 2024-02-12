import { ServerResponse } from 'http';
import { User } from '../type/type';
import { sendResponse } from './sendResponse';
import { checkUUID } from '../utils/checkValidUUID';

export const getMethodHandler = (endpoint: string, users: User[], response: ServerResponse): void => {
  const id = endpoint.split('/')[2];
  if (id) {
    const isUUID = checkUUID(id);
    if (isUUID) {
      const currentPerson = users.find((user) => user.id === id);
      currentPerson
        ? sendResponse(200, response, currentPerson)
        : sendResponse(404, response, { message: 'User not found.' });
    } else {
      sendResponse(400, response, { message: 'Not found.' });
    }
  } else {
    sendResponse(200, response, users);
  }
};
