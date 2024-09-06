import { model, Schema } from 'mongoose';

interface IDirector {
  name: string;
}

const directorSchema = new Schema<IDirector>({
  name: {
    type: String,
    required: true,
  },
});

export default model<IDirector>('director', directorSchema);
