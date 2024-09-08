import mongoose, { Schema } from 'mongoose';

const cardSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    requred: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: 'user',
    requred: true,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model('card', cardSchema);
