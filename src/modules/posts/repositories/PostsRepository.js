import Repository from '@shared/repositories/Repository';
import Posts from '../schema/Posts';

export default class PostsRepository extends Repository {
   constructor() {
      super(Posts);
   }
}
