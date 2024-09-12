import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    requred: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    default: '«Жак-Ив Кусто»',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true,
    default: '«Исследователь»',
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});
export default mongoose.model('user', userSchema);
