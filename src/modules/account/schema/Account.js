import mongoose from 'mongoose';
import schemaOptions from '@utils/schemaOptions';

const AccountSchema = new mongoose.Schema(
   {
      firstName: {
         type: String,
         required: true,
      },
      lastName: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: false,
         select: false,
      },
      languages: {
         type: [String],
         required: true,
         uppercase: true,
      },
      linkedin: {
         type: String,
      },
      github: {
         type: String,
      },
      role: {
         type: String,
      },
   },
   schemaOptions,
);

export default mongoose.model('account', AccountSchema);
