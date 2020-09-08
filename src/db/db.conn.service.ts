import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class DBConnService {
  public constructor(private conn: Connection) {}

  getConn(): Connection {
    return this.conn;
  }

  closeConn(): Promise<void> {
    return this.conn.close();
  }
}
