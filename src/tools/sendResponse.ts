import { ServerResponse } from 'http';

export const sendResponse = <T>(
  statusCode: number,
  response: ServerResponse,
  data?: T,
): void => {
  if (!response.headersSent) {
    response.statusCode = statusCode;
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Content-Type', 'application/json');
    data
      ? response.end(JSON.stringify(data))
      : response.end();
  }
};
