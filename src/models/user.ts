import mongoose, { Schema, Error } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

const avatarUrlRegExp = /^(https?:\/\/)(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?(#)?$/;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: any) => typeof value === 'string' && !isEmpty(value) && isEmail(value),
      message: 'Передан некорректный email.',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
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
    required: [true, 'Необходим Avatar URL'],
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (value: string) => {
        if (typeof value !== 'string') {
          return false;
        }
        return avatarUrlRegExp.test(value);
      },
      message: (props: Error.ValidatorError) => `Передан некорректный url для avatar ${props.value}.`,
    },
  },
});

export default mongoose.model('user', userSchema);
