import { createInterface } from 'readline';
import { createConnection } from 'typeorm';
import validator from 'validator';

import { AdminUser } from '../db/entity/AdminUser';
import { AuthService } from '../auth/auth.service';

const RL = createInterface({
  terminal: true,
  input: process.stdin,
  output: process.stdout,
});

const question = (q: string): Promise<string> => {
  return new Promise(resolve => {
    RL.question(q, ans => {
      resolve(ans);
    });
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
      pw = await question('Admin pw (at least 8 chars): ');

      if (!pw || !validator.isLength(pw, { min: 8 })) continue;

      break;
    }

    while (true) {
      pwConfirm = await question('Admin pw confirm: ');

      if (!pwConfirm || pwConfirm !== pw) continue;

      break;
    }

    console.log();
    res = (await question(`Create this account? [y/n] `)).trim().toLowerCase();
    console.log();

    if (res !== 'y') continue;

    break;
  }

  try {
    const admin = new AdminUser();
    const conn = await createConnection();

    admin.email = email;
    admin.pw = await new AuthService().hashPw(pw);

    await conn.createEntityManager().save(admin);

    console.log('\nSuccessfully created admin user!');
    RL.close();
  } catch (err) {
    console.log('\nFailed to create admin:', err);
    RL.close();
  }
})();
