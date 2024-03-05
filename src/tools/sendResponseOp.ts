import { ServerResponse } from 'http';

export const sendOptionsResponse = (response: ServerResponse) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, POST, PUT, PATCH, DELETE'); 
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 
  response.writeHead(204);
  response.end();
};