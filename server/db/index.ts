import 'reflect-metadata';
import { createConnection } from 'typeorm';

class DB {
  async init(): Promise<any> {
    createConnection().then(() => {
      console.log('DB connection created');
    });
  }
}

export default new DB();
