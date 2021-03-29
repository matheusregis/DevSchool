import { compare } from 'bcrypt';

export default async function comparePasswordHash(password, passwordHash) {
   const passwordMatched = await compare(password, passwordHash);

   return passwordMatched;
}
