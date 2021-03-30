import mongoose from 'mongoose';
import schemaOptions from '@utils/schemaOptions';

const PostsSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      links: {
         type: [String],
         default: [],
      },
   },
   schemaOptions,
);

export default mongoose.model('posts', PostsSchema);
