import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types/MyContext';

export const logger: MiddlewareFn<MyContext> = async ({ args }, next) => {
  console.log('args:' + JSON.stringify(args));
  return next();
};
