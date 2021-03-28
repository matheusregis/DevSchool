import { Router } from 'express';

const accountsRoutes = Router();

accountsRoutes.post('/', async (req, res) => {
  const { name, email, password, languages, linkedin, github } = req.body;
  res.status(200).json({ teste });
});

export default accountsRoutes;
