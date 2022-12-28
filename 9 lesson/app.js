const express = require('express');
const app = express();
const hbs = require('hbs');

app.set('view engine', 'hbs');

app.use(express.json());

app.post('/page', (req, res) => {
  const { model, year, img_src } = req.body;

  res.render('page', { model, year, img_src });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
