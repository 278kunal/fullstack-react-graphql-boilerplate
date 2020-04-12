import { Field, InputType } from 'type-graphql';
import { Length, IsEmail } from 'class-validator';

@InputType()
export default class RegisterInput {
  @Field()
  @Length(1, 30)
  firstName: string;

  @Field()
  @Length(1, 30)
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
