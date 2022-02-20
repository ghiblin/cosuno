import * as express from 'express';
import { addCompaniesRoutes } from './app/companies';

const app = express();
addCompaniesRoutes(app);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
