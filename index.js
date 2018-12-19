var app = require('express')();
var url = require('url');
var search = require('./search');
var http = require('http').Server(app);
var port = process.env.PORT || 3001;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/*', function(req, res){
    var url_parts = url.parse(req.url, true);
    //const title = url_parts.pathname+JSON.stringify(url_parts.query);
    //console.log(url_parts.pathname.split("/")[2]);
    switch(url_parts.pathname.split("/")[2]){
        case "test":
            res.send("TEST API"+JSON.stringify(url_parts.query));
            break;
        case "full":
            res.sendFile(__dirname + '/db.json');
            break;
        case "search":
            search.search(url_parts,res);
            break;
        default:
            res.send("UNKNOWN");
            break;
    }
});



http.listen(port, function(){
  console.log('listening on *:' + port);
});
