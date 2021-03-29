import Repository from '@shared/repositories/Repository';
import Languages from '../schema/Languages';

export default class LanguagesRepository extends Repository {
   constructor() {
      super(Languages);
   }
}
