var fs = require('fs');

module.exports.get = function(req, res) {
    var user = fs.readFileSync('app/data/user/' + req.params.userName + '.json', 'utf8');
    res.setHeader('Content-Type', 'application/json');
    res.send(user);
}

module.exports.save = function(req, res) {
    var user = req.body;
    fs.writeFileSync('app/data/user/' + user.userName + '.json', JSON.stringify(user));
    res.send(user);
}

module.exports.getAll = function(req, res) {
    var path = 'app/data/user/';
    
    var files = [];
    try {
        files = fs.readdirSync(path);
    } catch(e) {
        res.send('[]');
        res.end();
    }

    var results = "[";
    for(var idx=0; idx<files.length; idx++) {
        if(files[idx].indexOf(".json") == files[idx].length - 5) {
            results += fs.readFileSync(path + "/" + files[idx]) + ",";
        }
    }
    results = results.substr(0, results.length - 1);
    results += "]";

    res.setHeader('Content-Type', 'application/json');
    res.send(results);
    res.end();
};