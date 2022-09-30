const Blog = require('../models/blog');

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((blogs) => res.render('blogs/index', { title: 'All Blogs', blogs: blogs }))
    .catch((err) => console.log(err));
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((results) => {
      res.render('blogs/details', { title: `${results.title}`, blog: results });
    })
    .catch((err) => console.log(err));
};

const blog_create_get = (req, res) => {
  res.render('blogs/create', { title: 'Create Blog' });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body)
    .save()
    .then((results) => res.redirect('/blogs'))
    .catch((err) => console.log(err));
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((results) => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
