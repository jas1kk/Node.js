const express = require('express');
const app = express();
const port = 3000;

let cars = [
  { model: 'Toyota Camry' },
  { model: 'Honda Civic' },
  { model: 'Ford Fusion' }
];

app.get('/cars', (req, res) => {
  res.json(cars);
});

app.post('/cars', (req, res) => {
  const { model } = req.body;

  cars.push({ model });

  res.json({ message: 'Car added successfully' });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

const input = document.getElementById('car-model-input');
const button = document.getElementById('add-car-button');
const carList = document.getElementById('car-list');

button.addEventListener('click', () => {
  const model = input.value;

  fetch('/cars', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model })
  })
    .then(response => response.json())
    .then(response => {
      console.log(response.message);
    });
});

fetch('/cars')
  .then(response => response.json())
  .then(cars => {
    cars.forEach(car => {
      const li = document.createElement('li');
      li.textContent = car.model;
      carList.appendChild(li);
    });
  });
