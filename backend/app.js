const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./mongoose/models/Post');
const config = require('./config/config');

const app = express();

mongoose.connect(config.mongoose.uri, config.mongoose.options, err => {
  err ? console.log(err) : console.log('mongoose connected');
  mongoose.set('debug', true);
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.post('/api/posts', (req, res) => {
  const {title, content} = req.body;

  const newPost = new Post({
    title,
    content
  });

  newPost.save()
    .then(data => {

      // generate data for client
      const post = {
        id: data._id,
        title: data.title,
        content: data.content
      };

      res.status(201).json({
        message: 'Post added successfully.',
        post
      });
    })
    .catch(err => {
      return res.status(400).json({
        message: 'An error occurred during adding the post! Please try again later.',
        error: err
      });
    });
});

app.get('/api/posts', (req, res) => {

  Post.find()
    .then(data => {

      // generate data for client
      const posts = data.map(post => ({
        id: post._id,
        title: post.title,
        content: post.content
      }));

      // send data to client
      res.status(200).json({
        message: 'posts loaded.',
        posts
      });

    })
    .catch(err => res.status(404).json({ // catch an error and send it to client
      message: 'Unable to load posts.',
      error: err
    }));

});

app.delete('/api/posts/:id', (req, res) => {

  const id = req.params.id;

  Post.findOneAndDelete({_id: id})
    .then(() => {

      res.status(200).json({
        message: 'The post was successfully deleted.'
      });
    })
    .catch(err => res.status(404).json({ // catch an error and send it to client
      message: 'Unable to cancel the post.',
      error: err
    }));

});

module.exports = app;
