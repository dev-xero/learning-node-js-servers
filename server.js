const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// CREATE AN EXPRESS APP
const app = express();

// TEST DB URI
const dbURI = 'mongodb://127.0.0.1:27017/node-blogs';

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(3000, () =>
      console.log(
        `listening for requests at port 3000, site: http://localhost:3000`
      )
    )
  )
  .catch((err) => console.log(err));

// SET EJS AS VIEW ENGINE
app.set('view engine', 'ejs');

// BLOG ARRAY CONTAINING OBJECTS
const blogs = [
  {
    title: 'Chainsaw Man',
    snippet: 'lorem ipsum dolor sit amet',
  },
  {
    title: 'Monkey D Luffy',
    snippet: 'lorem ipsum dolor sit amet',
  },
  {
    title: 'Mob Psycho III',
    snippet: 'lorem ipsum dolor sit amet',
  },
];

// MIDDLE WARE FOR STATIC FILES
app.use(express.static('public'));

app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'Mob Psycho III',
    snippet: 'Mob Psycho III - The third part of the series',
    body: 'This is be really good to watch',
  });
  blog
    .save()
    .then((results) => res.send(results))
    .catch((err) => console.log(err));
});

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((results) => res.send(results))
    .catch((err) => console.log(err));
});

app.get('/single-blog', (req, res) => {
  Blog.findById('6336dc8cde4ccabc02d6761e')
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get('/', (req, res) => {
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create Blog' });
});

// 404 PAGES
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
