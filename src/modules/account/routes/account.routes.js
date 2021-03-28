import { Router } from 'express';

const accountsRoutes = Router();

accountsRoutes.post('/', async (req, res) => {
  const { name, email, password, languages, linkedin, github } = req.body;
});

export default accountsRoutes;
