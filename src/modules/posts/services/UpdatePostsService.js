import AppError from '@shared/errors/AppError';
import PostsRepository from '../repositories/PostsRepository';

export default class UpdatePostsService {
   async execute({ title, description, links, id }) {
      const postsRepository = new PostsRepository();

      const checkPostExist = await postsRepository.findById(id);

      if (!checkPostExist) {
         throw new AppError('Invalid Post Id', 400);
      }

      const language = await postsRepository.findByIdAndUpdate({ title, description, links, id });
      return language;
   }
}
