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
app.get('/data/event', events.getAll);
app.post('/data/event', events.save);

app.get('/data/user/:userName', users.get);
app.get('/data/user', users.getAll);
app.post('/data/user/:userName', users.save);

app.get('*', function(req, res) { res.sendFile(roothPath + '/app/index.html'); });

app.listen(8000);
console.log('Listening on port 8000...');