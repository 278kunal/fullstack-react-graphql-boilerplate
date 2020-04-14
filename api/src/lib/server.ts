import express from 'express';

export class Server {
  private readonly _app: any;

  constructor() {
    this._app = express();
  }

  protected get app(): any {
    return this._app;
  }

  start(): void {
    this.app.listen('12000', () => {
      return console.log(`Server started at http://localhost:${12000} 🚀`);
    });
  }
}
