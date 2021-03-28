import AccountRepository from '../repositories/AccountRepository';

export default class CreateAccountService {
   async execute({ firstName, lastName, email, password, languages, linkedin, github }) {
      const accountRepository = new AccountRepository();
      const account = await accountRepository.create({ firstName, lastName, email, password, languages, linkedin, github });

      return account;
   }
}
