import generatePasswordHash from '@utils/generatePasswordHash';
import AppError from '@shared/errors/AppError';
import AccountRepository from '../repositories/AccountRepository';

export default class CreateAccountService {
   async execute({ firstName, lastName, email, password, languages, linkedin, github, key }) {
      const accountRepository = new AccountRepository();

      const checkAccountExist = await accountRepository.findOne({ email });
      if (checkAccountExist) {
         throw new AppError('Email Already Used', 400);
      }
      const hash = await generatePasswordHash(password, 10);
      let account;
      if (key) {
         const role = 'ADMIN';
         account = await accountRepository.create({ firstName, lastName, email, password: hash, languages, linkedin, github, role });
         return account;
      }
      const role = 'CLIENT';
      account = await accountRepository.create({ firstName, lastName, email, password: hash, languages, linkedin, github, role });

      return account;
   }
}
