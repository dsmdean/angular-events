var express = require('express');
var path = require('path');
var events = require('./eventsController');
var users = require('./usersController');
var app = express();
var roothPath = path.normalize(__dirname + '/../');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(roothPath + '/app'));

app.get('/data/event/:id', events.get);
app.post('/data/event/:id', events.save);
app.get('/data/user/:userName', users.get);
app.post('/data/user/:userName', users.save);

app.listen(8000);
console.log('Listening on port 8000...');