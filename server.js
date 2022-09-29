const express = require('express');
// CREATE AN EXPRESS APP
const app = express();

app.listen(3000, () => {
  console.log('listening for requests on port 3000');
});

app.get('/', (req, res) => {
  res.sendFile('./views/index.html', { root: __dirname });
  console.log('served file to the client');
});

app.get('/about', (req, res) => {
  res.sendFile('./views/about.html', { root: __dirname });
  console.log('served file to the client');
});

// REDIRECTS
app.get('/about-us', (req, res) => {
  res.redirect('/about');
  console.log('redirected user to /about');
});

// 404 PAGES
app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', { root: __dirname });
});
