import { Router } from 'express';

import accountRoutes from '@modules/account/routes/account.routes';
import sessionsRoutes from '@modules/account/routes/sessions.routes';

const routes = Router();

routes.use('/account', accountRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
