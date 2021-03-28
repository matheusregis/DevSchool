import 'dotenv/config';
import './config/moduleAlias';
import app from './shared/infra/app';

app.listen(3333, () => {
   console.log('Server running...');
});
