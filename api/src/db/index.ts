import 'reflect-metadata';
import { createConnection } from 'typeorm';

class DB {
  async init(): Promise<any> {
    let retries = 5;
    while (retries) {
      try {
        await createConnection();
        break;
      } catch (err) {
        console.log(err);
        retries = -1;
        console.log(`retries left: ${retries}`);
        // wait 5 sec
        await new Promise(res => setTimeout(res, 5000))
      }
    }
  }
}

export default new DB();
