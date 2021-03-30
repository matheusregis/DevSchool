import { Router } from 'express';
import AppError from '@shared/errors/AppError';
import checkRole from '@shared/infra/middlewares/checkRole';
import { roleAdmin, allRoles } from '@config/roles';

import PostsRepository from '../repositories/PostsRepository';
import CreatePostsService from '../services/CreatePostsService';
import UpdatePostsService from '../services/UpdatePostsService';

const postsRoutes = Router();

postsRoutes.post('/:languageId', checkRole(roleAdmin), async (req, res) => {
   const { title, description, links } = req.body;
   const { languageId } = req.params;
   if (!title || !description) {
      throw new AppError('Invalid Fields', 400);
   }

   const createPostsService = new CreatePostsService();
   const post = await createPostsService.execute({ title, description, links, languageId });

   res.status(200).json({ post });
});

postsRoutes.get('/all', checkRole(allRoles), async (req, res) => {
   const postsRepository = new PostsRepository();
   const { title, currentPage, limit } = req.query;
   const skip = (currentPage - 1) * limit;
   const where = title ? { languageName: new RegExp(`^${title}`, 'i') } : {};

   const total = await postsRepository.countWithFilter(where);
   const posts = await postsRepository.findAndPaginate({ where, skip, limit: Number(limit) || 10 });

   res.status(200).json({ total, posts });
});

postsRoutes.get('/:id', checkRole(allRoles), async (req, res) => {
   const postsRepository = new PostsRepository();
   const { id } = req.params;

   if (!id) {
      throw new AppError('Invalid Fields', 400);
   }

   const post = await postsRepository.findById(id);

   res.status(200).json({ post });
});

postsRoutes.put('/:id', checkRole(roleAdmin), async (req, res) => {
   const { id } = req.params;
   const { title, description, links } = req.body;

   if (!id) {
      throw new AppError('Invalid Fields', 400);
   }

   const updateLanguageService = new UpdatePostsService();
   const post = await updateLanguageService.execute({ title, description, links, id });

   res.status(200).json({ post });
});

postsRoutes.delete('/:id', checkRole(roleAdmin), async (req, res) => {
   const { id } = req.params;

   if (!id) {
      throw new AppError('Invalid Fields', 400);
   }
   const postsRepository = new PostsRepository();
   await postsRepository.delete(id);

   return res.status(200).json({ message: 'Post Deleted' });
});

export default postsRoutes;
