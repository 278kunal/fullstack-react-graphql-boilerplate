import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import RegisterInput from '../validators/register-input';
import bcrypt from 'bcryptjs';
import User from '../entity/user-entity';
import { MyContext } from '../types/MyContext';

@Resolver()
export default class UserResolver {
  @Query(() => User, { nullable: true })
  async getUser(@Ctx() ctx: MyContext): Promise<User | null | undefined> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (ctx.req.session!.userId) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return User.findOne(ctx.req.session!.userId);
  }

  @Mutation(() => User)
  async register(
    @Arg('data')
    { email, firstName, lastName, password }: RegisterInput,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();
    return user;
  }
}
