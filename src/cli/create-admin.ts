import { createInterface } from 'readline';
import { createConnection, QueryFailedError } from 'typeorm';
import validator from 'validator';
import { Writable } from 'stream';

import { AdminUser } from '../db/entity/AdminUser';
import { AuthService } from '../auth/auth.service';

let invisible = false; // If true, user keyboard input is invisible

const RL = createInterface({
  terminal: true,
  input: process.stdin,
  output: new Writable({
    write: (chunk, encoding, cb) => {
      if (!invisible) process.stdout.write(chunk, encoding);
      cb();
    },
  }),
});

const question = (q: string): Promise<string> => {
  invisible = false;

  return new Promise(resolve => {
    RL.question(q, ans => {
      resolve(ans);
    });
  });
};

// Same as question except user keyboard input is invisible (For asking pw)
const questionInvisible = (q: string): Promise<string> => {
  invisible = false;

  return new Promise(resolve => {
    RL.question(q, ans => {
      console.log();
      resolve(ans);
    });
    invisible = true;
  });
};

(async () => {
  let email: string;
  let pw: string;
  let pwConfirm: string;
  let res: string;

  while (true) {
    while (true) {
      email = (await question('Admin email: ')).trim();

      if (!email || !validator.isEmail(email)) continue;

      break;
    }

    while (true) {
      pw = await questionInvisible('Admin pw (at least 8 chars): ');

      if (!pw || !validator.isLength(pw, { min: 8 })) continue;

      break;
    }

    while (true) {
      pwConfirm = await questionInvisible('Admin pw confirm: ');

      if (!pwConfirm || pwConfirm !== pw) continue;

      break;
    }

    console.log();
    res = (await question(`Create this account? [y/n] `)).trim().toLowerCase();
    console.log();

    if (res !== 'y') continue;

    break;
  }

  const admin = new AdminUser();
  const conn = await createConnection();

  admin.email = email;
  admin.pw = await new AuthService().hashPw(pw);

  try {
    await conn.createEntityManager().save(admin);

    console.log('\nSuccessfully created admin user!\n');
  } catch (err) {
    if (err instanceof QueryFailedError) {
      console.log('\nAdmin email already exists.\n');
    } else {
      console.log('\nFailed to create admin:', err, '\n');
    }
  } finally {
    conn.close();
    RL.close();
  }
})();
