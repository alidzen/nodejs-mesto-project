import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    // поле обязательно для заполнения, иначе
    // будет выброшена ошибка
    required: true,
    // значение поля должно быть уникально в рамках коллекции,
    // создать двух пользователей с одинковым email не выйдет
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// Описываем модель. Первый параметр - имя коллекции БД, второй - схема данных
export default mongoose.model("user", userSchema);
