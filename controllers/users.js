/* eslint-disable comma-dangle */
const router = require('express').Router(); // создали роутер
const mongoose = require('mongoose');
const User = require('../models/user');

module.exports.createUser = router.post('/', (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }

      res.status(500).send({ message: 'Произошла ошибка' });
    });
});

module.exports.getAllUsers = router.get('/', (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }

      res.status(500).send({ message: 'Произошла ошибка' });
    });
});

module.exports.getUserById = router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: 'Переданы некорректный id' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
});

module.exports.updateUser = router.patch('/me', (req, res) => {
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
        res.status(404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
});

module.exports.updateUserAvatar = router.patch('/me/avatar', (req, res) => {
  const newAvatar = req.body.avatar;
  const id = req.user._id;

  User.findByIdAndUpdate(
    id,
    { avatar: newAvatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
});
