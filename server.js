ssxxxvar express = require("express");
var app = express();

app.listen(3000, function() {
    console.log('listening on 3000')
});

app.get('/', function (request, response) {
    response.send("Hi from server")
});
