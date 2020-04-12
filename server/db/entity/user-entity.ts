import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID, Root } from 'type-graphql';

@ObjectType()
@Entity('users')
export default class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'text', unique: true })
  email: string;

  @Field()
  @Column({ type: 'varchar', length: '230' })
  firstName: string;

  @Field()
  @Column({ type: 'varchar', length: '230' })
  lastName: string;

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Column()
  password: string;
}
