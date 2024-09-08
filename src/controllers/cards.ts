import { Request, Response } from 'express';
import Card from '../models/card';

export const createCard = (req: Request, res: Response) => {
  const { id, name } = req.params;
  Card.create({ id, name })
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send(err));
};

export const getCards = (_req: Request, res: Response) => {
  Card
    .find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      res.status(404).send({ message: err });
    });
};

export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  Card
    .deleteOne({ _id: cardId })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      res.status(404).send({ message: err });
    });
};

export const likeCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    // @ts-ignore
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      res.status(404).send({ message: err });
    });
};

export const dislikeCard = (req: Request, res: Response) => Card.findByIdAndUpdate(
  req.params.cardId,
  // @ts-ignore
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
).then((card) => {
  res.send({ data: card });
});
