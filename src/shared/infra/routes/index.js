import { Router } from 'express';

import accountRoutes from '@modules/account/routes/account.routes';

const routes = Router();

routes.use('/account', accountRoutes);

export default routes;
