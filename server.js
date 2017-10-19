const fetch = require('node-fetch');
const express = require('express');
const url = require('url');
const path = require('path');

const PORT = 8080;
const API_KEYS = require('./api-keys'); // gitignored
const API_URL = 'https://www.strava.com/api/v3';
const app = express();

// app.use(express.static(__dirname + '/dist'));

app.get('/:path/:filename', function(req, res) {
  console.log('assets');
  res.sendFile(path.join(__dirname, 'dist', req.params.path, req.params.filename));
});

app.get('/*', function(req, res) {
  console.log('homepage');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use('/login', (req, res) => {
  res.redirect('https://www.strava.com/oauth/authorize' +
      '?client_id=' + API_KEYS.id +
      '&response_type=code' +
      '&redirect_uri=http://localhost:8080/auth');
});

app.use('/auth', (req, res) => {
  const code = url.parse(req.url, true).query.code;
  const body = `client_id=${API_KEYS.id}&client_secret=${API_KEYS.secret}&code=${code}`;

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
  sendRequest(req, res, `${API_URL}/athletes`);
});

app.get('/athlete/:id', (req, res) => {
  sendRequest(req, res, `${API_URL}/athletes/${req.params.id}`);
})

function sendRequest(req, res, apiUrl) {
  const token = url.parse(req.url, true).query.access_token;

  return fetch(`${apiUrl}?access_token=${token}`)
    .then(response => response.json())
    .then(json => res.send(json));
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
