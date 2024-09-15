import mongoose, {
  Schema, Document, Types,
} from 'mongoose';
import { urlRegExp } from './constants';
import { AppModel } from './types';

interface ICard extends Document {
  name: string;
  link: string;
  owner: Types.ObjectId;
  likes: Types.ObjectId[];
  createdAt: Date;
}

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: [true, 'Необходима ссылка'],
    validate: {
      validator: (value: string) => {
        if (typeof value !== 'string') {
          return false;
        }
        return urlRegExp.test(value);
      },
      message: (props) => `Передан некорректный url для ссылки ${props.value}.`,
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: AppModel.User,
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: AppModel.User,
    required: true,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model(AppModel.Card, cardSchema);
