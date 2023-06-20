const { celebrate, Joi } = require('celebrate');

const createUserValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const getByIdValidate = celebrate({
  body: Joi.object().keys({
    userId: Joi.string().required(),
  }),
});

const updateUserValidate = celebrate({
  body: Joi.object().keys({
    newName: Joi.string().min(2).max(30).required(),
    newAbout: Joi.string().min(2).max(30).required(),
  }),
});

const updateUserAvatarValidate = celebrate({
  body: Joi.object().keys({
    newAvatar: Joi.string().required(),
  }),
});

const createCardValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required(),
  }),
});

const deleteCardValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
});

const likeCardValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
});

const dislikeCardValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
});

module.exports = {
  createUserValidate,
  getByIdValidate,
  updateUserValidate,
  updateUserAvatarValidate,
  loginValidate,
  createCardValidate,
  deleteCardValidate,
  likeCardValidate,
  dislikeCardValidate,
};
