import mongoose, { Schema } from 'mongoose'

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  context: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'categories',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
})

export default mongoose.model('posts', PostSchema)
