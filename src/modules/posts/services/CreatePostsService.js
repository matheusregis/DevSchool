import AppError from '@shared/errors/AppError';
import LanguageRepository from '@modules/languages/repositories/LanguagesRepository';
import PostsRepository from '../repositories/PostsRepository';

export default class CreatePostsService {
   async execute({ title, description, links, languageId }) {
      const postsRepository = new PostsRepository();

      const post = await postsRepository.create({ title, description, links });
      if (!post) {
         throw new AppError('Something Wrong', 400);
      }

      const languageRepository = new LanguageRepository();
      const language = await languageRepository.findById(languageId);
      if (!language) {
         throw new AppError('Invalid Language Id', 400);
      }
      const postId = [...language.postId, post.id];
      await languageRepository.updateOne({ id: languageId, postId });
      return post;
   }
}
