import { getRepository } from 'typeorm';

import AppError from '@shared/infra/errors/AppError';
import City from '../infra/typeorm/entities/City';
import State from '@modules/states/infra/typeorm/entities/State';

import { ICityCreate, ICitySearch } from '@config/Interfaces/ICity';

//TODO Consultar cidade pelo nome
//TODO Consultar cidade pelo estado

class CityService {
  public async create({ name, state_id }: ICityCreate): Promise<City> {
    const citiesRepository = getRepository(City);
    const stateRepository = getRepository(State);

    let state = null;
    try {
      state = await stateRepository.findOne({
        where: { id: state_id },
      });
      if (!state) {
        throw new AppError('This State Doesnt Exists');
      }
    } catch (Error) {
      return Error;
    }

    try {
      const findCity = await citiesRepository.findOne({
        where: { name, state: { id: state_id } },
      });
      if (findCity) {
        throw new AppError('This city already exists');
      }
    } catch (Error) {
      return Error;
    }

    const city = citiesRepository.create({
      name,
      state,
    });

    await citiesRepository.save(city);

    return city;
  }

  public async list({ name, stateId }: ICitySearch): Promise<City[] | City> {
    const cityRepository = getRepository(City);

    if (stateId) {
      try {
        const findCity = await cityRepository.find({
          where: { state: { id: stateId } },
          relations: ['state', 'client'],
        });
        if (findCity) {
          return findCity;
        }
        throw new AppError('Nothing was found');
      } catch (Error) {
        return Error;
      }
    } else if (name) {
      try {
        const findCity = await cityRepository.findOne(
          {
            name,
          },
          { relations: ['state', 'client'] }
        );

        if (findCity) {
          return findCity;
        }

        throw new AppError('This client doesnt exist.');
      } catch (Error) {
        return Error;
      }
    }
    const cityList = await cityRepository.find({
      take: 10,
      relations: ['state', 'client'],
    });

    return cityList;
  }
}

export default CityService;
