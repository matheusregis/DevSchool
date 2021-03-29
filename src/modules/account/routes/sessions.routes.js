import { Router } from 'express';

import AppError from '@shared/errors/AppError';
import { roleAdmin, roleClient, allRoles } from '@config/roles';
import checkRole from '@shared/infra/middlewares/checkRole';
import AuthenticateAccountService from '../services/AuthenticateAccountService';

const sessionsRoutes = Router();

sessionsRoutes.post('/signIn', async (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      throw new AppError('Invalid Fields', 400);
   }

   const authenticateAccountService = new AuthenticateAccountService();
   const { account, token, refreshToken } = await authenticateAccountService.execute({ email, password });

   res.json({ account, token, refreshToken });
});

sessionsRoutes.post('/signOut', checkRole(allRoles), async (req, res) => {
   res.send();
});

export default sessionsRoutes;
