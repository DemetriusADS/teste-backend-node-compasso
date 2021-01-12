import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import City from '@modules/cities/infra/typeorm/entities/City';

@Entity('states')
export default class State {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  name: String;

  @Column({ length: 2 })
  uf: String;

  @OneToMany(() => City, city => city.state)
  @JoinColumn({ name: 'stateId' })
  city: City[];

  @CreateDateColumn()
  created_at: Date;
}
