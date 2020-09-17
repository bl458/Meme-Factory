import { Injectable } from '@nestjs/common';
import { randomBytes, createHash } from 'crypto';
import { hash, compare } from 'bcrypt';

const TOKEN_BYTES = 128;
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
      hash(
        createHash('sha1')
          .update(pw)
          .digest('hex'), //Using sha1 ensures we are ok on bcrypt hash parameter length limit
        SALT_ROUNDS,
        (err, encrypted) => {
          err ? reject(err) : resolve(encrypted);
        },
      );
    });
  }

  async comparePw(pw: string, hashedPw: string): Promise<boolean> {
    return compare(
      createHash('sha1')
        .update(pw)
        .digest('hex'),
      hashedPw,
    );
  }
}
