import { v4 } from 'uuid';
import { redis } from '../lib/redis';

export const createConfirmationUrl = async (userId: number): Promise<string> => {
  const token = v4();
  await redis.set(token, userId, 'ex', 60 * 60 * 24); // 1 day expire

  return `http://localhost:3000/user/confirm/${token}`;
};
