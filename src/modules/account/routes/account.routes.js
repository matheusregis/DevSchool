import { Router } from 'express';
import CreateAccountService from '../services/CreateAccountService';

const accountsRoutes = Router();

accountsRoutes.post('/', async (req, res) => {
   const { firstName, lastName, email, password, languages, linkedin, github } = req.body;

   const createAccountService = new CreateAccountService();
   const account = await createAccountService.execute({ firstName, lastName, email, password, languages, linkedin, github });
   delete account.password;
   res.status(200).json({ account });
});

accountsRoutes.post('/:key', async (req, res) => {
   const { firstName, lastName, email, password, languages, linkedin, github } = req.body;

   const createAccountService = new CreateAccountService();
   const account = await createAccountService.execute({ firstName, lastName, email, password, languages, linkedin, github });

   res.status(200).json({ account });
});

export default accountsRoutes;
