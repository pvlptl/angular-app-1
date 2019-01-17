const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {id: '1', title: 'softserve', content: 'learn angular'},
    {id: '2', title: 'softserve 1', content: 'learn angular 1'},
    {id: '3', title: 'softserve 2', content: 'learn angular 2'},
    {id: '4', title: 'softserve 3', content: 'learn angular 3'},
    {id: '5', title: 'softserve 4', content: 'learn angular 4'}
  ];
  res.status(200).json({
    message: 'ok',
    posts
  });
});

module.exports = app;
