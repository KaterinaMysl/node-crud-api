import cluster from 'cluster';
import http from 'http';
import os from 'os';
import { requestHandler } from './tools/requestH';
const createServer = (port: number) => {
  const server = http.createServer(requestHandler);
  server.listen(port, () => {
    console.log(`Worker process ${process.pid} is running and listening on "http://localhost:${port}" port ${port}`);
  });
};
if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork(); 
  }
  cluster.on('exit', (worker) => {
    console.log(`Worker process ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  if (cluster.worker) {
    const port = 4000 + cluster.worker.id;
    createServer(port);
  } else {
    console.log('Unable to determine worker id');
  }
} 
