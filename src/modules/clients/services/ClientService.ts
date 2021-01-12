import { getRepository } from 'typeorm';

import AppError from '@shared/infra/errors/AppError';
import Client from '../infra/typeorm/entities/Client';
import City from '@modules/cities/infra/typeorm/entities/City';
import {
  IClient,
  IClientCreate,
  IClientUpdate,
  IClientSearch,
  IClientDeletedResponse,
} from '@config/Interfaces/IClient';

//TODO Remover cliente

class ClientService {
  public async create({
    name,
    age,
    born_date,
    city_id,
    gender,
  }: IClientCreate): Promise<Client> {
    const clientsRepository = getRepository(Client);
    const cityRepository = getRepository(City);

    let city = null;

    try {
      city = await cityRepository.findOne({
        where: { id: city_id },
      });
      if (!city) {
        throw new AppError('This City Doesnt Exists');
      }
    } catch (Error) {
      return Error;
    }

    const client = clientsRepository.create({
      name,
      age,
      born_date,
      gender,
      city,
    });

    await clientsRepository.save(client);

    return client;
  }

  public async list({
    clientId,
    name,
  }: IClientSearch): Promise<Client[] | Client> {
    const clientRepository = getRepository(Client);

    if (clientId) {
      try {
        const findClient = await clientRepository.findOne(
          {
            id: clientId,
          },
          { relations: ['city'] }
        );
        if (findClient) {
          return findClient;
        }
        throw new AppError('This client doesnt exist.');
      } catch (Error) {
        return Error;
      }
    } else if (name) {
      try {
        const findClient = await clientRepository.findOne(
          {
            name,
          },
          { relations: ['city'] }
        );

        if (findClient) {
          return findClient;
        }

        throw new AppError('This client doesnt exist.');
      } catch (Error) {
        return Error;
      }
    }

    const clientList = await clientRepository.find({
      take: 10,
      relations: ['city'],
    });

    return clientList;
  }

  public async update({ client_id, name }: IClientUpdate): Promise<Client> {
    const clientsRepository = getRepository(Client);

    const client = await clientsRepository.findOne(client_id);

    if (!client) {
      throw new AppError('This client doesnt exist.');
    }
    if (name) {
      client.name = name;
    }

    await clientsRepository.save(client);

    return client;
  }

  public async delete({ client_id }: IClient): Promise<IClientDeletedResponse> {
    const clientsRepository = getRepository(Client);
    const client = await clientsRepository.findOne(client_id);

    if (!client) {
      throw new AppError('This client doesnt exist.');
    }
    console.log(client_id);
    await clientsRepository.delete({ id: client_id });
    return { status: 200, message: 'Apagado com sucesso!' };
  }
}

export default ClientService;
