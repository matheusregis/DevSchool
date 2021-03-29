import auth from './auth';

export default function checkRole(role) {
   return async (req, res, next) => {
      return auth(req, res, next, role);
   };
}
