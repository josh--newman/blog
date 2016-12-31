const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 4444

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(port);
console.log('Listening...')
