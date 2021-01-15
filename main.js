
const express = require('express');
const knex = require('knex');
const funct = require('./funct');
const path = require('path');

let app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

var knx = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'madflow336',
    database: 'node'
  }
});

app.get('/', (req, res) =>
{
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/users/', (req, res) =>
{
  knx.select('*').from('users')
  .where('name', req.query.name)
  .then(a => {
    res.send(`<h1>Users:</h1><br><h2>${a[0].name}, ${a[0].score}</h2>`);
  }).catch(e => {
    res.send('<h1>NO such user</h1>')
  });
});

app.post('/create', (req, res) =>
{
    let u = req.body
    if(u.name !== undefined)
    {
      knx('users').insert({
      name: u['name'],
      score: u['score']
    }).then(a => res.send(`<h1>Welcome ${u['name']}</h1>`))
    .catch(e => res.status(500).json(e))
  }else {
     res.status(500).json({'nope': 'nope'})
  }
});

app.listen(3000);
