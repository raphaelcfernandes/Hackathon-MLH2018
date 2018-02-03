var express = require("express");
var app = express();
var PythonShell = require('python-shell');
var express = require("express");
var bodyParser = require("body-parser");
var load = require('express-load');
var path = require('path');
var PythonShell = require('python-shell');
var spawn = require("child_process");
var util = require("util");

//var models = require("./server-side/models/index");
var app = express();
var cors = require('cors');
var cookieParser = require('cookie-parser');


app.set('port', process.env.PORT || 8080);

app.use(express.static(path.join(__dirname, 'client-side/public')));
app.use(express.static(path.join(__dirname, 'server-side/controllers')))
app.use(cors());
app.set('views', __dirname + '/client-side/public/views');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/client-side/public/views')));

load("./server-side/controllers")
    .then("./server-side/routes")
    .into(app);



app.get('*', function (req, res) {
    res.render('index.html');
});

app.listen(3000, function () {
    console.log('listening on 3000')
    
});

module.exports = app;   