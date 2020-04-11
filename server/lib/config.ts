import dotenv from 'dotenv';

dotenv.config();

const IS_STAGING = process.env.NODE_ENV === 'development';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const GRAPHQL_PATH = '/graphql';

export default {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  IS_PRODUCTION,
  IS_STAGING,
  GRAPHQL_PATH,
};
