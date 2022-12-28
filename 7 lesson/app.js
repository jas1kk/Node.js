const express = require('express');
const app = express();
const port = 8080;

let cars = [];

app.get('/cars', (req, res) => {
  res.send(cars);
});

app.post('/cars', (req, res) => {
  const newCar = req.body;

  cars.push(newCar);

  res.send('Successfully added car');
});

app.put('/cars', (req, res) => {
  const updatedCar = req.body;

  const carIndex = cars.findIndex((car) => car.id === updatedCar.id);

  cars[carIndex] = updatedCar;

  res.send('Successfully updated car');
});

app.delete('/cars/:id', (req, res) => {
  const carId = req.params.id;

  const carIndex = cars.findIndex((car) => car.id === carId);

  cars.splice(carIndex, 1);

  res.send('Successfully deleted car');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
