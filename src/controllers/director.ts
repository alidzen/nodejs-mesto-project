import { Request, Response } from "express";

import Director from "../models/director";

export const getDirectors = (req: Request, res: Response) => {
  return Director.find({})
    .then((directors) => res.send({ data: directors }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

export const createDirector = (req: Request, res: Response) => {
  const { name } = req.body;

  return Director.create({ name })
    .then((director) => res.send({ data: director }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
