import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class DBConnService {
  public constructor(private conn: Connection) {}

  public getConn(): Connection {
    return this.conn;
  }

  public closeConn(): Promise<void> {
    return this.conn.close();
  }
}
