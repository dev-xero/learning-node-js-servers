const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// CREATE AN EXPRESS APP
const app = express();

// TEST DB URI
const dbURI = 'mongodb://127.0.0.1:27017/node-blogs';

// CONNECT TO THE DATABASE
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

// MIDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.use('/blogs', blogRoutes);

// 404 PAGES
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
