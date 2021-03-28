import { Router } from 'express';
import AppError from '@shared/errors/AppError';
import CreateAccountService from '../services/CreateAccountService';
import SignJWTService from '../services/SignJWTService';
import GenerateRefreshTokenService from '../services/GenerateRefreshTokenService';

const accountsRoutes = Router();

accountsRoutes.post('/', async (req, res) => {
   const { firstName, lastName, email, password, languages, linkedin, github } = req.body;
   if (!firstName || !lastName || !email || !password) {
      throw new AppError('Invalid Fields', 400);
   }

   if (password?.length < 8) {
      throw new AppError('password must contain at least 8 characters', 400);
   }

   const createAccountService = new CreateAccountService();
   const account = await createAccountService.execute({ firstName, lastName, email, password, languages, linkedin, github });

   const signJWTService = new SignJWTService();
   const token = await signJWTService.execute(account);

   const generateRefreshTokenService = new GenerateRefreshTokenService();
   const refreshToken = generateRefreshTokenService.execute(account);

   delete account.password;
   res.status(200).json({ account, token, refreshToken });
});

accountsRoutes.post('/:key', async (req, res) => {
   const { firstName, lastName, email, password } = req.body;
   const { key } = req.params;

   if (!firstName || !lastName || !email || !password) {
      throw new AppError('Invalid Fields', 400);
   }

   if (password?.length < 8) {
      throw new AppError('password must contain at least 8 characters', 400);
   }

   if (key !== process.env.KEY) {
      throw new AppError('Invalid Key', 400);
   }
   const createAccountService = new CreateAccountService();
   const account = await createAccountService.execute({ firstName, lastName, email, password, key });

   const signJWTService = new SignJWTService();
   const token = await signJWTService.execute(account);

   const generateRefreshTokenService = new GenerateRefreshTokenService();
   const refreshToken = generateRefreshTokenService.execute(account);

   delete account.password;
   res.status(200).json({ account, token, refreshToken });
});

export default accountsRoutes;
