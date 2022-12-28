const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const router = express.Router();

router.get('/machines', (req, res) => {
  const machines = getMachinesFromDb();
  res.json(machines);
});

router.post('/machines', (req, res) => {
  const newMachine = req.body;
  if (validateMachine(newMachine)) {
    addMachineToDb(newMachine);
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
});

router.delete('/machines/:id', (req, res) => {
  const id = req.params.id;
  deleteMachineFromDb(id);
  res.sendStatus(200);
});


app.use('/api', router);

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
