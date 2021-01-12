import { Router } from 'express';

//Import os arquivos routes com @modules
import stateRouter from '@modules/states/infra/http/routes/states.routes';
import cityRouter from '@modules/cities/infra/http/routes/cities.routes';
import clientRouter from '@modules/clients/infra/http/routes/clients.routes';

const routes = Router();

routes.use('/state', stateRouter);
routes.use('/city', cityRouter);
routes.use('/client', clientRouter);

export default routes;
