import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { hash, compare } from 'bcrypt';

const TOKEN_BYTES = 256;
const SALT_ROUNDS = 12;

@Injectable()
export class AuthService {
  async generateToken(): Promise<string> {
    return new Promise((resolve, reject) =>
      randomBytes(TOKEN_BYTES, (err, buff) => {
        err ? reject(err) : resolve(buff.toString('hex'));
      }),
    );
  }

  async hashPw(pw: string): Promise<string> {
    return new Promise((resolve, reject) => {
      hash(pw, SALT_ROUNDS, (err, encrypted) => {
        err ? reject(err) : resolve(encrypted);
      });
    });
  }

  async comparePw(pw: string, hashedPw: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      compare(pw, hashedPw, (err, bool) => {
        err ? reject(err) : resolve(bool);
      });
    });
  }
}
