import dotenv from 'dotenv';
dotenv.config();
import renderer from './lib/renderer';
import { Server } from './lib/server';
import DB from './db';

class App extends Server {
  constructor() {
    super();
    this.initApp();
    this.initDB();
  }

  initDB(): void {
    DB.init();
  }

  initApp(): void {
    this.app.use((req, res, next) => {
      if (req.originalUrl !== '/graphql') {
        renderer(req, res);
      } else {
        next();
      }
    });
  }
}

export default new App().start();
