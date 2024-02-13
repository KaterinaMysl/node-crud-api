import http from 'http';
import * as dotenv from 'dotenv';
import { requestHandler } from './tools/requestH';

dotenv.config();

const ports = [4000, 4001, 4002];

ports.forEach(port => {
  http.createServer(requestHandler).listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});