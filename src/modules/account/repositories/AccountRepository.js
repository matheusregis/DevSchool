import Repository from '@shared/repositories/Repository';
import Account from '../schema/Account';

export default class AccountRepository extends Repository {
   constructor() {
      super(Account);
   }
}
