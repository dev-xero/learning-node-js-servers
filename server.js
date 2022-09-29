const express = require('express');

// CREATE AN EXPRESS APP
const app = express();

// SET EJS AS VIEW ENGINE
app.set('view engine', 'ejs');

app.listen(3000, () => {
  console.log('listening for requests on port 3000');
});

app.get('/', (req, res) => {
  res.render('index')
});

app.get('/about', (req, res) => {
  res.sendFile('./views/about.html', { root: __dirname });
});

// 404 PAGES
app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', { root: __dirname });
});
