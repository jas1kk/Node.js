const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const usersData = require('./users.json');

app.get('/users', (req, res) => {
  res.render('users', { users: usersData });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
