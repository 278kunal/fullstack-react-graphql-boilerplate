import dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { Server } from './lib/server';

class App extends Server {
  constructor() {
    super();
    this.initApollo();
  }

  async initApollo(): Promise<any> {
    try {
      const apolloServer = new ApolloServer({ typeDefs, resolvers });

      apolloServer.applyMiddleware({
        app: this.app,
        path: '/graphql',
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

export default new App().start();
