const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '647f14af82c06f5a0bf97911', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use('/', router);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(3000, () => {
  console.log(`App listening on port ${3000}`);
});