const express = require('express');
const multer = require('multer');
const Post = require('../mongoose/models/Post');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid Mime Type');
    if (isValid) error = null;
    callback(error, 'backend/images');
  },
  filename(req, file, callback) {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    callback(null, `${name}-${Date.now()}.${ext}`);
  }
});

/*
  Route:
  http://localhost:3000/api/posts
 */

router.post('/', multer({storage}).single('image'), (req, res) => {
  const {title, content} = req.body;
  const url = req.protocol + '://' + req.get('host');
  const imagePath = url + '/images/' + req.file.filename;

  const newPost = new Post({
    title,
    content,
    imagePath
  });

  newPost.save()
    .then(data => {

      // generate data for client
      const post = {
        id: data._id,
        title: data.title,
        content: data.content,
        imagePath: data.imagePath
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

router.put('/', (req, res) => {

  const {id, title, content} = req.body;

  Post.findById(id)
    .then(post => {
      post.title = title;
      post.content = content;
      post.save().then(data => {

        // generate data for client
        const post = {
          id: data._id,
          title: data.title,
          content: data.content
        };

        res.status(200).json({
          message: 'Post updated successfully.',
          post
        });

      });
    })
    .catch(err => {
      return res.status(400).json({
        message: 'An error occurred during editing the post! Please try again later.',
        error: err
      });
    });

});

router.get('/:id', (req, res) => {

  const {id} = req.params;
  Post.findOne({_id: id})
    .then(post => {

      // if wrong id was provided
      if (!post) {
        return res.status(404).json({
          message: 'The post not found!'
        })
      }

      // generate data for client
      const data = {
        id: post._id,
        title: post.title,
        content: post.content,
        imagePath: post.imagePath
      };

      console.log(data);

      res.status(200).json({
        post: data
      });

    })
    .catch(err => res.status(404).json({ // catch an error and send it to client
      message: 'Unable to load posts.',
      error: err
    }));

});

router.get('/', (req, res) => {

  Post.find()
    .then(data => {

      // generate data for client
      const posts = data.map(post => ({
        id: post._id,
        title: post.title,
        content: post.content,
        imagePath: post.imagePath
      }));

      setTimeout(() => {
        // send data to client
        res.status(200).json({
          message: 'posts loaded.',
          posts
        });
      }, 1000);

    })
    .catch(err => res.status(404).json({ // catch an error and send it to client
      message: 'Unable to load posts.',
      error: err
    }));

});

router.delete('/:id', (req, res) => {

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

module.exports = router;
