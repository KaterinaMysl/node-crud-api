import { IncomingMessage, ServerResponse } from 'http';
import { sendOptionsResponse } from '../tools/sendResponseOp';
import { postMethodHandler } from './postMethod';
import { putMethodHandler } from '../tools/putMethod';
import { deleteMethodHandler } from '../tools/deleteMethod';
import { getMethodHandler } from './getMethod';
import { MAX_ENDPOINT} from '../constants/constants';
import { User } from '../type/type';
import { sendResponse } from './sendResponse';

export const users: User[] = [];

export const requestHandler = (request: IncomingMessage, response: ServerResponse) => {
  try {
    const { method, url } = request;
    if (url && url.startsWith('/api/users')  && url.split('/').length <= MAX_ENDPOINT) {
      const end = url.slice('api/'.length);
      switch (method) {
      case 'OPTIONS':
        sendOptionsResponse(response);
        break;
      case 'GET':
        getMethodHandler(end, users, response);
        break;
      case 'POST':
        postMethodHandler(users, request, response);
        break;
      case 'PUT':
        putMethodHandler(end, users, request, response);
        break;
      case 'DELETE':
        deleteMethodHandler(end, users, response);
        break;
      default: 
        sendResponse(400, response, { message: 'Prohibited method' });
      }
    } else {
      sendResponse(404, response, { message: 'Invalid endpoint' });
    }
  } catch {
    sendResponse(500, response, { message: 'Internal server error' });
  }

};
