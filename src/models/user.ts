import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true,
  },
  // email: {
  //   type: String,
  //   required: true,
  //   // значение поля должно быть уникально в рамках коллекции,
  //   // создать двух пользователей с одинковым email не выйдет
  //   unique: true,
  // },
  avatar: {
    type: String,
    required: true,
  },
});
export default mongoose.model('user', userSchema);
