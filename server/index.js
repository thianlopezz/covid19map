const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('port', process.env.PORT || 3001);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static(path.join(__dirname, '../build')));
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(app.get('port'), (req, res) => {
  console.log('Magic happens on port: ', app.get('port'));
  console.log('We are on: ', process.env.NODE_ENV || 'DEVELOPMENT');
});
