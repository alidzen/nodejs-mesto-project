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
    // Код ревью: все так, мы передаем функцию, которая будет вызвана в момент создания карточки
    // А не в момент инициализации модели
    // Подробнее: https://stackoverflow.com/questions/35501273/what-is-the-difference-between-date-now-and-date-now-in-mongoose
    default: Date.now,
  },
});
export default mongoose.model('card', cardSchema);
