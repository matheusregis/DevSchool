import { Router } from 'express';
import AppError from '@shared/errors/AppError';
import checkRole from '@shared/infra/middlewares/checkRole';
import { roleAdmin, allRoles } from '@config/roles';

import CreateLanguageService from '../services/CreateLanguageService';
import UpdateLanguageService from '../services/UpdateLanguageService';
import LanguagesRepository from '../repositories/LanguagesRepository';

const languagesRoutes = Router();

languagesRoutes.post('/', checkRole(roleAdmin), async (req, res) => {
   const { languageName } = req.body;
   if (!languageName) {
      throw new AppError('Invalid Fields', 400);
   }

   const createLanguageService = new CreateLanguageService();
   const language = await createLanguageService.execute({ languageName });

   res.status(200).json({ language });
});

languagesRoutes.get('/all', checkRole(allRoles), async (req, res) => {
   const languagesRepository = new LanguagesRepository();
   const { languageName, currentPage, limit } = req.query;
   const skip = (currentPage - 1) * limit;
   const where = languageName ? { languageName: new RegExp(`^${languageName}`, 'i') } : {};

   const total = await languagesRepository.countWithFilter(where);
   const languages = await languagesRepository.findAndPaginate({ where, skip, limit: Number(limit) || 10 });

   res.status(200).json({ total, languages });
});

languagesRoutes.get('/:id', checkRole(allRoles), async (req, res) => {
   const languagesRepository = new LanguagesRepository();
   const { id } = req.params;

   if (!id) {
      throw new AppError('Invalid Fields', 400);
   }

   const language = await languagesRepository.findById(id);

   res.status(200).json({ language });
});

languagesRoutes.put('/:id', checkRole(roleAdmin), async (req, res) => {
   const { id } = req.params;
   const { languageName } = req.body;

   if (!languageName || !id) {
      throw new AppError('Invalid Fields', 400);
   }

   const updateLanguageService = new UpdateLanguageService();
   const language = await updateLanguageService.execute({ languageName, id });

   res.status(200).json({ language });
});

languagesRoutes.delete('/:id', checkRole(roleAdmin), async (req, res) => {
   const { id } = req.params;

   if (!id) {
      throw new AppError('Invalid Fields', 400);
   }
   const languagesRepository = new LanguagesRepository();
   await languagesRepository.delete(id);

   return res.status(200).json({ message: 'Language Deleted' });
});

export default languagesRoutes;
