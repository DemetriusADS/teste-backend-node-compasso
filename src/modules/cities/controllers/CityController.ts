import { ICitySearch } from '@config/Interfaces/ICity';
import { Request, Response } from 'express';
import CityService from '../services/CityService';

class CityController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, state_id } = request.body;

    const newCity = await new CityService().create({
      name,
      state_id,
    });

    return response.json(newCity);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { name, stateId } = request.query;

    const cityList = await new CityService().list({
      name,
      stateId,
    } as ICitySearch);

    return response.json(cityList);
  }
}

export default CityController;
