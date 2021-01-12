import { Router } from 'express';

import StateController from '@modules/states/controllers/StateController';

const state = new StateController();

const stateRouter = Router();

stateRouter.post('/', state.create);
stateRouter.get('/', state.list);

export default stateRouter;
