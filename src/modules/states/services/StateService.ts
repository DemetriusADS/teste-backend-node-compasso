import { getRepository } from 'typeorm';

import AppError from '@shared/infra/errors/AppError';
import State from '../infra/typeorm/entities/State';
import City from '@modules/cities/infra/typeorm/entities/City';

import { IState, IStateUpdate, IStateSearch } from '@config/Interfaces/IState';

export default class StateService {
  public async create({ name, uf }: IState): Promise<State> {
    const stateRepository = getRepository(State);

    try {
      const findState = await stateRepository.findOne({
        where: { name, uf },
      });
      if (findState) {
        throw new AppError('This State Alredy Exists');
      }
    } catch (Error) {
      return Error;
    }
    const newState = stateRepository.create({ name, uf });

    await stateRepository.save(newState);

    return newState;
  }

  public async update({ state_id, name, uf }: IStateUpdate): Promise<State> {
    const statesRepository = getRepository(State);

    const state = await statesRepository.findOne({ id: state_id });
    state_id;
    if (!state) {
      throw new AppError('This client doesnt exist.');
    }

    if (name) {
      state.name = name;
    }
    if (uf) {
      state.uf = uf;
    }

    await statesRepository.save(state);

    return state;
  }

  public async list({ name, uf }: IStateSearch): Promise<State[] | State> {
    const stateRepository = getRepository(State);

    if (name) {
      const findState = await stateRepository.findOne(
        {
          name,
        },
        {
          relations: ['city'],
        }
      );
      if (findState) return findState;
    }
    const stateList = await stateRepository.find({
      take: 10,
    });

    return stateList;
  }
}
