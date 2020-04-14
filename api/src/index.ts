import dotenv from 'dotenv';
dotenv.config();
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';
import { redis } from './lib/redis';

import bookResolver from './db/resolvers/book-resolver';
import userResolver from './db/resolvers/user-resolver';
import { Server } from './lib/server';
import DB from './db';

class App extends Server {
  constructor() {
    super();
    this.initDB();
    this.initSession();
    this.initApollo();
  }

  async initDB(): Promise<void> {
    await DB.init();
  }

  async initSession(): Promise<void> {
    const RedisStore = await connectRedis(session);

    await this.app.use(
      cors({
        credentials: true,
        origin: 'http://localhost:12000',
      }),
    );

    await this.app.use(
      session({
        store: new RedisStore({
          client: redis as any,
        }),
        name: 'qid',
        secret: 'asdasd213213',
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
        },
      } as any),
    );
  }

  async initApollo(): Promise<any> {
    try {
      const schema = await buildSchema({
        resolvers: [bookResolver, userResolver],
        authChecker: ({ context: { req } }) => {
          return !!req.session.userId;
        },
      });

      const apolloServer = new ApolloServer({
        schema,
        playground: true,
        context: ({ req }: any): any => ({ req }),
      });

      apolloServer.applyMiddleware({
        app: this.app,
        path: '/',
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

export default new App().start();
