const express = require('express');
const path = require('path');
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
// const Sequelize = require('sequelize');
const app = express();
app.use(bodyParser.json());

// Serve static files from the React app in production. During development, run client app separately
if (process.env.NODE_ENV === 'production') {
  console.log('Running in production');
  app.use(express.static(path.join(__dirname, '/../client/build')));
}

// Routing
app.use('/', require('./routes'));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/../client/build/index.html'));
// });

const port = process.env.PORT || 5001;
app.listen(port);

console.log('listening on port ' + port);