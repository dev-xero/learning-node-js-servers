const express = require('express');

// CREATE AN EXPRESS APP
const app = express();

// SET EJS AS VIEW ENGINE
app.set('view engine', 'ejs');

app.listen(3000, () => {
  console.log(
    'listening for requests on port 3000, site: http://localhost:3000'
  );
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/blogs/create', (req, res) => {
  res.render('create');
});

// 404 PAGES
app.use((req, res) => {
  res.status(404).render('404');
});
