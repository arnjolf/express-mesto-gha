/* eslint-disable comma-dangle */
const mongoose = require('mongoose');
const User = require('../models/user');
const { ERROR_BADREQUEST, ERROR_NOTFOUND, ERROR_SERVER } = require('./errors');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
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

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => {
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOTFOUND).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res
          .status(ERROR_BADREQUEST)
          .send({ message: 'Переданы некорректный id' });
        return;
      }
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateUser = (req, res) => {
  const newName = req.body.name;
  const newAbout = req.body.about;
  const id = req.user._id;

  User.findByIdAndUpdate(
    id,
    { name: newName, about: newAbout },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOTFOUND).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send({ data: user });
    })
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

module.exports.updateUserAvatar = (req, res) => {
  const newAvatar = req.body.avatar;
  const id = req.user._id;

  User.findByIdAndUpdate(
    id,
    { avatar: newAvatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOTFOUND).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send({ data: user });
    })
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
