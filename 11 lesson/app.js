const express = require('express');
const app = express();

let phones = [
  { id: 1, model: 'iPhone', price: 800, color: 'black' },
  { id: 2, model: 'Samsung', price: 600, color: 'white' },
  { id: 3, model: 'Pixel', price: 700, color: 'black' }
];

app.get('/phones', (req, res) => {
  if (req.query.model) {
    const filteredPhones = phones.filter(phone => phone.model === req.query.model);
    res.json(filteredPhones);
  } else {
    res.json(phones);
  }
});

app.post('/phones', (req, res) => {
  const newPhone = req.body;
  newPhone.id = phones.length + 1;
  phones.push(newPhone);
  res.json(newPhone);
});

app.delete('/phones/:id', (req, res) => {
  const phoneId = req.params.id;
  const phoneIndex = phones.findIndex(phone => phone.id === parseInt(phoneId));
  phones.splice(phoneIndex, 1);
  res.json({ message: 'Phone deleted' });
});

app.put('/phones/:id', (req, res) => {
  const phoneId = req.params.id;
  const phoneIndex = phones.findIndex(phone => phone.id === parseInt(phoneId));
  phones[phoneIndex] = req.body;
  phones[phoneIndex].id = phoneId;
  res.json(phones[phoneIndex]);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
