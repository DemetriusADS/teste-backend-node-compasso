import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import State from '@modules/states/infra/typeorm/entities/State';
import Client from '@modules/clients/infra/typeorm/entities/Client';

@Entity('Cities')
export default class City {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  name: String;

  @ManyToOne(() => State, state => state.city)
  state: State;

  @OneToMany(() => Client, client => client.city)
  @JoinColumn()
  client: Client[];

  @CreateDateColumn()
  created_at: Date;
}
