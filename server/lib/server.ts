import express from 'express';
import typeDefs from '../graphql/typeDefs';
import resolvers from '../graphql/resolvers';
import { ApolloServer } from 'apollo-server-express';
import { PORT } from './config';

export class Server {
  private readonly _app: express.Application;
  private readonly _server: any;

  constructor() {
    this._app = express();
    this._server = new ApolloServer({ typeDefs, resolvers });
    this.init();
  }

  protected get app(): express.Application {
    return this._app;
  }

  protected get server(): any {
    return this._server;
  }

  init() {
    this.app.use(express.static('dist'));
    this.server.applyMiddleware({ app: this.app });
  }

  start() {
    this._app.listen('3000', () => {
      return console.log(`Server started at http://localhost:${PORT} 🚀`);
    });
  }
}
