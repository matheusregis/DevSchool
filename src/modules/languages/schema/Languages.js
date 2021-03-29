import mongoose from 'mongoose';
import schemaOptions from '@utils/schemaOptions';

const LanguagesSchema = new mongoose.Schema(
   {
      languageName: {
         type: String,
         required: true,
         unique: true,
      },
   },
   schemaOptions,
);

export default mongoose.model('languages', LanguagesSchema);
