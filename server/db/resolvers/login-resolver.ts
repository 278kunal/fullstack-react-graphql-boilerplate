import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import bcrypt from 'bcryptjs';
import User from '../entity/user-entity';
import { MyContext } from '../types/MyContext';

@Resolver()
export default class LoginResolver {
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

    const valid = bcrypt.compare(password, user.password);

    if (!valid) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ctx.req.session!.userId = user.id;

    return user;
  }
}
