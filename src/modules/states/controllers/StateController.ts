import { Request, Response } from 'express';
import StateService from '@modules/states/services/StateService';
import { IStateSearch } from '@config/Interfaces/IState';

export default class StateController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, uf } = request.body;

    const newState = await new StateService().create({ name, uf });

    return response.json(newState);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { name = '', uf = '' } = request.query;
    const stateList = await new StateService().list({
      name,
      uf,
    } as IStateSearch);

    return response.json(stateList);
  }
}
