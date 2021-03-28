import AppError from '@shared/errors/AppError';

export default class GenerateRefreshTokenService {
   execute(account) {
      if (!account) {
         throw new AppError('Incorrect Account Combination', 400);
      }

      const { email, password, role } = account;

      const object = {
         email,
         password,
         role,
      };

      const string = JSON.stringify(object);
      const base64 = Buffer.from(string).toString('base64');

      return base64;
   }
}
