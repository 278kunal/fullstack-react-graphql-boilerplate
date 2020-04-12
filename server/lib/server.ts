import express, { Request, Response, NextFunction } from 'express';
import renderer from './renderer';

export class Server {
  private readonly _app: any;

  constructor() {
    this._app = express();
    this.initApp();
  }

  protected get app(): any {
    return this._app;
  }

  initApp(): void {
    this.app.use(express.static('dist'));
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.originalUrl !== '/graphql') {
        renderer(req, res);
      } else {
        next();
      }
    });
  }

  start(): void {
    this.app.listen('3000', () => {
      return console.log(`Server started at http://localhost:${3000} 🚀`);
    });
  }
}
