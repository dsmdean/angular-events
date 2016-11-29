var fs = require('fs');

module.exports.get = function(req, res) {
    var event = fs.readFileSync('app/data/event/' + req.params.id + '.json', 'utf8');
    res.setHeader('Content-Type', 'application/json');
    res.send(event);
}

module.exports.save = function(req, res) {
    // var files = [];
    // fs.readdir('app/data/event/', function(err, items) {
    //     if(err) {
    //         throw err;
    //     }

    //     files = items;  
    // }); 

    // req.body.id = files.length + 5;
    var event = req.body;
    fs.writeFileSync('app/data/event/' + req.params.id + '.json', JSON.stringify(event));
    res.send(event);
}