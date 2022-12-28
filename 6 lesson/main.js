import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [machines, setMachines] = useState([]);
  const [newMachine, setNewMachine] = useState({});

  useEffect(() => {
    axios.get('/api/machines')
      .then(res => setMachines(res.data))
      .catch(err => console.error(err));
  }, []);

  function handleAddMachine(event) {
    event.preventDefault();
    axios.post('/api/machines', newMachine)
      .then(res => {
        setMachines([...machines, newMachine]);
        setNewMachine({});
      })
      .catch(err => console.error(err));
  }

  function handleDeleteMachine(id) {
    axios.delete(`/api/machines/${id}`)
      .then(res => {
        setMachines(machines.filter(machine => machine.id !== id));
      })
      .catch(err => console.error(err));
  }

  return (
    <div>
      <h1>Machines</h1>
      <ul>
        {machines.map(machine => (
          <li key={machine.id}>
            {machine.name}
            <button onClick={() => handleDeleteMachine(machine.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add Machine</h2>
      <form onSubmit={handleAddMachine}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={newMachine.name}
          onChange={event => setNewMachine({ ...newMachine, name: event.target.value })}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
