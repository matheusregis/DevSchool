import AppError from '@shared/errors/AppError';
import comparePasswordHash from '@utils/comparePasswordHash';
import AccountRepository from '../repositories/AccountRepository';
import GenerateRefreshTokenService from './GenerateRefreshTokenService';
import SignJWTService from './SignJWTService';

export default class AuthenticateAccountService {
   async execute({ email, password }) {
      const accountRepository = new AccountRepository();

      const account = await accountRepository.findOneEmailPassword(email);
      if (!account) {
         throw new AppError('incorrect password combination', 401);
      }

      const passwordMatched = await comparePasswordHash(password, account.password);
      if (!passwordMatched) {
         throw new AppError('incorrect password combination', 401);
      }

      const signJWTService = new SignJWTService();
      const token = signJWTService.execute(account);

      const generateRefreshTokenService = new GenerateRefreshTokenService();
      const refreshToken = generateRefreshTokenService.execute(account);

      return { account, token, refreshToken };
   }
}
