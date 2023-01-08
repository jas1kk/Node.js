const express = require('express');
const app = express();
const port = 3000;

let categories = [
  { id: 1, name: 'Category 1' },
  { id: 2, name: 'Category 2' }
];

let products = [
  { id: 1, name: 'Product 1', price: 100, categoryId: 1 },
  { id: 2, name: 'Product 2', price: 200, categoryId: 2 }
];

app.get('/categories', (req, res) => {
  res.send(categories);
});

app.post('/categories', (req, res) => {
  const name = req.body.name;
  const id = categories.length + 1;
  categories.push({ id, name });
  res.send({ id, name });
});

app.get('/products', (req, res) => {
  res.send(products);
});

app.get('/products', (req, res) => {
  const categoryId = req.query.categoryId;
  const filteredProducts = products.filter(product => product.categoryId == categoryId);
  res.send(filteredProducts);
});

app.post('/products', (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const categoryId = req.body.categoryId;
  const id = products.length + 1;
  products.push({ id, name, price, categoryId });
  res.send({ id, name, price, categoryId });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
