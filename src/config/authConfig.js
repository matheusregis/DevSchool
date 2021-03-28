export default {
   secrets: process.env.SECRET_AUTH,
   expiresIn: process.env.EXPIRATION_TOKEN || '1d',
};
