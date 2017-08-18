const fetch = require('node-fetch');
const express = require('express');
const url = require('url');

const PORT = 8080;
const app = express();
const apiKeys = require('./api-keys'); // gitignored

app.use(express.static(__dirname + '/dist'));

app.use('/auth', (req, res) => {
  const code = url.parse(req.url, true).query.code;
  const body = `client_id=${apiKeys.id}&client_secret=${apiKeys.secret}&code=${code}`;

  fetch(
    'https://www.strava.com/oauth/token',
    {
      method: 'post',
      body: body
    }
  )
    .then(response => response.json())
    .then((json) => {
      res.cookie('flyby_access_token', json.access_token);
      res.redirect('/');
    });
});

app.get('/athletes', (req, res) => {
  const token = url.parse(req.url, true).query.access_token;

  fetch(`https://www.strava.com/api/v3/athletes?access_token=${token}`)
    .then(response => response.json())
    .then(json => res.send(json));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
