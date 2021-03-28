import bcrypt from 'bcrypt';

export default async function generatePasswordHash(password) {
   const hash = await bcrypt.hash(password, 10);

   return hash;
}
