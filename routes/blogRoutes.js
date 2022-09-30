const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();

router.get('/blogs', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((blogs) => res.render('index', { title: 'All Blogs', blogs: blogs }))
    .catch((err) => console.log(err));
});

router.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create Blog' });
});

// GET /URL/:ROUTE PARAMETER
router.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((results) => {
      res.render('details', { title: `${results.title}`, blog: results });
    })
    .catch((err) => console.log(err));
});

router.post('/blogs', (req, res) => {
  const blog = new Blog(req.body)
    .save()
    .then((results) => res.redirect('/blogs'))
    .catch((err) => console.log(err));
});

router.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((results) => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
