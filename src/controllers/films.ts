import { Request, Response } from 'express';
import Film from '../models/film';

export const getFilms = (req: Request, res: Response) => Film.find({})
  .then((films) => res.send({ data: films }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

export const createFilm = (req: Request, res: Response) => {
  const { title, genre } = req.body;

  /* напишите код здесь */
  return Film.create({ title, genre })
    .then((film) => res.send({ data: film }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
