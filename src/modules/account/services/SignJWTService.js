import { sign } from 'jsonwebtoken';
import authConfig from '@config/authConfig';

export default class SignJWTService {
   execute(account) {
      const { id, role } = account;
      const token = sign({ id, role }, authConfig.secrets, { subject: id, expiresIn: authConfig.expiresIn });

      return token;
   }
}
