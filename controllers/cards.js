/* eslint-disable comma-dangle */
const mongoose = require('mongoose');
const Card = require('../models/card');
const { ERROR_BADREQUEST, ERROR_NOTFOUND, ERROR_SERVER } = require('./errors');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOTFOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(ERROR_BADREQUEST).send({ message: 'Неверный id карточки' });
        return;
      }
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res
          .status(ERROR_BADREQUEST)
          .send({ message: 'Переданы некорректные данные' });
        return;
      }

      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOTFOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(ERROR_BADREQUEST).send({ message: 'Неверный id карточки' });
        return;
      }
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true, runValidators: true }
  )
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOTFOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(ERROR_BADREQUEST).send({ message: 'Неверный id карточки' });
        return;
      }
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
    });
};
