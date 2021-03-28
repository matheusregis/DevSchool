import patch from 'path';

export default {
   '~': patch.join(__dirname, '..'),
   '@api': patch.join(__dirname, '..', 'api'),
   '@config': patch.join(__dirname, '..', 'config'),
   '@modules': patch.join(__dirname, '..', 'modules'),
   '@shared': patch.join(__dirname, '..', 'shared'),
   '@utils': patch.join(__dirname, '..', 'shared', 'utils'),
   '@providers': patch.join(__dirname, '..', 'shared', 'providers'),
};
