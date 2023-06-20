const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errHandler = require('./middlewares/centralizedError');
const {
  createUserValidate,
  loginValidate,
} = require('./middlewares/validator');

const app = express();
app.use(express.json());
app.use(helmet());
app.post('/signin', loginValidate, login);
app.post('/signup', createUserValidate, createUser);

app.use(auth);

app.use('/', router);
app.use((req, res) => {
  res.status(404).send({ message: 'Неправильный адрес' });
});
app.use(errors());
app.use(errHandler);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${3000}`);
});
