import { model, Schema } from 'mongoose';

export interface IFilm {
  title: string;
  genre: string;
  director: Schema.Types.ObjectId;
}

const filmSchema = new Schema<IFilm>({
  title: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  genre: {
    type: String,
    enum: ['комедия', 'драма', 'боевик', 'триллер', 'документальный'],
    required: true,
  },
  director: {
    type: Schema.Types.ObjectId,
    ref: 'director',
    required: true,
  },
});

export default model<IFilm>('Film', filmSchema);
