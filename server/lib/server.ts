import express from 'express';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import bookResolver from '../db/resolvers/book.resolver';

export class Server {
  private readonly _app: express.Application;
  private readonly _server: any;

  constructor() {
    this._app = express();
    this.init();
    this.initApollo();
  }

  protected get app(): express.Application {
    return this._app;
  }

  protected get server(): any {
    return this._server;
  }

  async initApollo(): Promise<any> {
    try {
      const schema = await buildSchema({
        resolvers: [bookResolver],
      });

      const apolloServer = new ApolloServer({ schema, playground: true });

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
    this._app.listen('3000', () => {
      return console.log(`Server started at http://localhost:${3000} 🚀`);
    });
  }
}
