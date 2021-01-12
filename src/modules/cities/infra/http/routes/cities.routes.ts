import { Router } from 'express';

import citiesController from '@modules/cities/controllers/CityController';

const city = new citiesController();

const cityRoute = Router();

cityRoute.get('/', city.list);
cityRoute.post('/', city.create);

export default cityRoute;
