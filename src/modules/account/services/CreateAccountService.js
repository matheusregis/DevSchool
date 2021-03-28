import generatePasswordHash from '@utils/generatePasswordHash';
import AccountRepository from '../repositories/AccountRepository';

export default class CreateAccountService {
   async execute({ firstName, lastName, email, password, languages, linkedin, github }) {
      const accountRepository = new AccountRepository();
      const role = 'CLIENT';
      const hash = await generatePasswordHash(password, 10);
      const account = await accountRepository.create({ firstName, lastName, email, password: hash, languages, linkedin, github, role });

      return account;
   }
}
