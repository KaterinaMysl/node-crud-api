import http from 'http';
import * as dotenv from 'dotenv';
import { requestHandler } from './tools/requestH';

dotenv.config();
const port = process.env.NODE_PORT || 4000;
http.createServer(requestHandler).listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
