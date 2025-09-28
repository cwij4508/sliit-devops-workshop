const express = require('express');
const app = express();
const port = 3000;

// Simple route
app.get('/', (req, res) => {
  res.send('<h1>Hello from Docker!</h1><p>This is a simple Node.js app running in a container.</p>');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`App listening at http://0.0.0.0:${port}`);
});