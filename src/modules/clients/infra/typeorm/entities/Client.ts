import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import City from '@modules/cities/infra/typeorm/entities/City';

@Entity('clients')
export default class Client {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  name: String;

  @Column()
  gender: Number; //1 - male; 2 - female

  @Column()
  born_date: Date;

  @Column()
  age: Number;

  @ManyToOne(() => City, city => city.client)
  city: City;

  @CreateDateColumn()
  created_at: Date;
}
