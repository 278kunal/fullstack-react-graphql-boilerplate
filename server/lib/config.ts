import dotenv from 'dotenv';

dotenv.config();

export const IS_STAGING = process.env.NODE_ENV === 'development';

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export const GRAPHQL_PATH = process.env.GRRAPHQL_PATH;

export const URI = process.env.URI;

export const PORT = process.env.PORT;

export const NODE_ENV = process.env.NODE_ENV;
