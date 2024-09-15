import mongoose, { Schema, Document } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import { urlRegExp } from './constants';
import { AppModel } from './types';

interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new Schema<IUser>({
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
    minlength: 8,
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
        return urlRegExp.test(value);
      },
      message: (props) => `Передан некорректный url для avatar ${props.value}.`,
    },
  },
});

export default mongoose.model(AppModel.User, userSchema);
