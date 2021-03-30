import { Router } from 'express';

import accountRoutes from '@modules/account/routes/account.routes';
import sessionsRoutes from '@modules/account/routes/sessions.routes';
import languageRoutes from '@modules/languages/routes/languages.routes';
import postsRoutes from '@modules/posts/routes/posts.routes';

const routes = Router();

routes.use('/account', accountRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/languages', languageRoutes);
routes.use('/posts', postsRoutes);

export default routes;
