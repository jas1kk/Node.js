const http = require('http');
const fs = require('fs');

const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' }
];

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/users/count') {
      res.write(`Number of users: ${users.length}`);
      res.end();
    } else if (req.url.startsWith('/users/delete/')) {
      const id = parseInt(req.url.split('/')[3], 10);

      const index = users.findIndex(user => user.id === id);

      if (index >= 0) {
        users.splice(index, 1);

        res.write('User deleted');
      } else {
        res.write('User not found');
      }
      res.end();
    }
  }
});

server.listen(3000);

fs.readFile('users.json', (err, data) => {
    if (err) throw err;
  
    const users = JSON.parse(data);
  });
fs.writeFile('users.json', JSON.stringify(users), (err) => {
    if (err) throw err;
  });
    