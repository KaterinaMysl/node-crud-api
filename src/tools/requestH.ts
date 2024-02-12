import { IncomingMessage, ServerResponse } from 'http';
import { getMethodHandler } from './getMethod';
import { User } from '../type/type';
import { sendResponse } from './sendResponse';

const users: User[] = [];

export const requestHandler = (request: IncomingMessage, response: ServerResponse) => {
  try {
    const { method, url } = request;
    if (url && url.startsWith('/api/users') && url.split('/').length < 5) {
      const end = url.slice('api/'.length);
      switch (method) {
      case 'GET':
        getMethodHandler(end, users, response);
        break;
      }
    } else {
      sendResponse(404, response, { message: 'Invalid endpoint' });
    }
  } catch {
    console.log('Oооps!');
  }

};
