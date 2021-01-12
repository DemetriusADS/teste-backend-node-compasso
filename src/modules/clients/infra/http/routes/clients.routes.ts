import { Router } from 'express';

import clientsController from '@modules/clients/controllers/ClientController';

const client = new clientsController();

const clientRoute = Router();

clientRoute.get('/', client.list);
clientRoute.post('/', client.create);
clientRoute.put('/', client.update);
clientRoute.delete('/', client.delete);

export default clientRoute;
