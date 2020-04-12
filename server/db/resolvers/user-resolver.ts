import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql';
import RegisterInput from '../validators/register-input';
import bcrypt from 'bcryptjs';
import User from '../entity/user-entity';
import { MyContext } from '../types/MyContext';
import { isAuth } from '../middlewares/isAuth';
import { logger } from '../middlewares/logger';

@Resolver()
export default class UserResolver {
  @UseMiddleware(isAuth, logger)
  @Query(() => User, { nullable: true })
  async getLoggedInUser(@Ctx() ctx: MyContext): Promise<User | null | undefined> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!ctx.req.session!.userId) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return User.findOne(ctx.req.session!.userId);
  }

  @UseMiddleware(logger)
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

  @UseMiddleware(logger)
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: MyContext,
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return null;
    }

    ctx.req.session!.userId = user.id;
    return user;
  }
}
