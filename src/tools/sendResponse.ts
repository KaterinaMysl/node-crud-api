import { ServerResponse } from 'http';

export const sendResponse = <T>(
  statusCode: number,
  response: ServerResponse,
  data?: T,
): void => {
  if (!response.headersSent) {
    response.statusCode = statusCode;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(data));
  }
};
