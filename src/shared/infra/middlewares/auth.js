import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/authConfig';

export default async function auth(req, res, next, role) {
   const authHeader = req.headers.authorization;

   if (!authHeader) {
      throw new AppError('token not provided', 401);
   }

   const [, token] = authHeader.split(' ');
   try {
      const decoded = await verify(token, authConfig.secrets);

      req.id = decoded.id;
      req.role = decoded.role;
      if (Array.isArray(role)) {
         const auth = role.find(role => role === decoded.role);
         if (auth) {
            return next();
         }
      }
      if (role !== decoded.role) {
         throw new AppError('Unauthorized Access', 401);
      }

      return next();
   } catch (error) {
      throw new AppError('unauthorized access', 403);
   }
}
