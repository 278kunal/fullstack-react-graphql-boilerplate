import "dotenv/config"
import renderer from './lib/renderer';
import { Server } from './lib/server';

class App extends Server {
  constructor() {
    super();
    this.initApp();
  }

  initApp() {
    this.app.get('*', (req, res) => {
      renderer(req, res);
    });
  }

}

export default new App().start();
