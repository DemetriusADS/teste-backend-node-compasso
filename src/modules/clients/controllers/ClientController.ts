import {
  IClient,
  IClientSearch,
  IClientUpdate,
} from '@config/Interfaces/IClient';
import { Request, Response } from 'express';
import ClientService from '../services/ClientService';

class ClientController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, age, born_date, city_id, gender } = request.body;

    const newClient = await new ClientService().create({
      name,
      age,
      born_date,
      city_id,
      gender,
    });

    return response.json(newClient);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { client_id } = request.query;
    const { name } = request.body;

    const updatedClient = await new ClientService().update({
      client_id,
      name,
    } as IClientUpdate);

    return response.json(updatedClient);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { clientId = '', name = '' } = request.query;
    const clientList = await new ClientService().list({
      clientId,
      name,
    } as IClientSearch);

    return response.json(clientList);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { client_id } = request.query;
    const clientDeleted = await new ClientService().delete({
      client_id,
    } as IClient);

    return response.status(clientDeleted.status).json(clientDeleted.message);
  }
}

export default ClientController;
