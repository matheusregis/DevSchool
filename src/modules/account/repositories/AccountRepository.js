import Repository from '@shared/repositories/Repository';
import Account from '../schema/Account';

export default class AccountRepository extends Repository {
   constructor() {
      super(Account);
   }

   async findOneEmailPassword(email) {
      const where = Account.translateAliases({ email });
      const data = await Account.findOne(where).select('+password');
      return data?.toObject();
   }
}
