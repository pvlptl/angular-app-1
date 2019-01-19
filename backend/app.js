const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const config = require('./config/config');

const app = express();

mongoose.connect(config.mongoose.uri, config.mongoose.options, err => {
  err ? console.log(err) : console.log('mongoose connected');
  mongoose.set('debug', true);
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS, PUT');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use('/images', express.static(path.join('backend/images')));

// use routes
const postsRouter = require('./routes/posts');
app.use('/api/posts', postsRouter);

module.exports = app;
