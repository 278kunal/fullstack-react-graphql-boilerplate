import express from 'express';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';

import { redis } from './redis';
import bookResolver from '../db/resolvers/book-resolver';
import userResolver from '../db/resolvers/user-resolver';
import loginResolver from '../db/resolvers/login-resolver';

export class Server {
  private readonly _app: express.Application;
  private readonly _server: any;

  constructor() {
    this._app = express();
    this.init();
    this.initSession();
    this.initApollo();
  }

  protected get app(): express.Application {
    return this._app;
  }

  protected get server(): any {
    return this._server;
  }

  initSession(): void {
    const RedisStore = connectRedis(session);

    this.app.use(
      cors({
        credentials: true,
        origin: 'http://localhost:3000',
      }),
    );

    this.app.use(
      session({
        store: new RedisStore({
          client: redis as any,
        }),
        name: 'qid',
        secret: 'asdasd213213',
        //resave: true,
        //saveUninitiated: true,
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
        resolvers: [bookResolver, userResolver, loginResolver],
      });

      const apolloServer = new ApolloServer({
        schema,
        playground: true,
        context: ({ req }: any): any => ({ req }),
      });

      apolloServer.applyMiddleware({
        app: this.app,
        path: '/graphql',
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  init(): void {
    this.app.use(express.static('dist'));
  }

  start(): void {
    this.app.listen('3000', () => {
      return console.log(`Server started at http://localhost:${3000} 🚀`);
    });
  }
}
