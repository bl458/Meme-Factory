import { randomBytes } from 'crypto';

const UUID_BYTES = 32;

export const generateUUID = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    randomBytes(UUID_BYTES, (err, buf) => {
      err ? reject(err) : resolve(buf.toString('hex'));
    });
  });
};
