var PythonShell = require('python-shell');
var spawn = require("child_process");
var util = require("util");

module.exports = function (app) {
    var requestController = {
        runScript: function (req, res, next) {
            runPythonScript(res)
        },
        sendAllergy: function (req, res) {
            var spawn = require('child_process').spawn,
                py = spawn('python', ['/home/raphael/Documents/hackathon/server-side/controllers/test.py']),
                data = [req.body.arg1, req.body.arg2],
                dataString = '';

            py.stdout.on('data', function (data) {
                var textChunk = data.toString('utf8');// buffer to string

                util.log(textChunk);
                dataString += data.toString();
            });
            py.stdout.on('end', function () {
                //console.log('Sum of numbers=', dataString);
            });
            py.stdin.write(JSON.stringify(data));
            py.stdin.end();
            res.sendStatus(200);

        },
        sendProblem: function (req, res) {
            var spawn = require('child_process').spawn,
                py = spawn('python', ['/home/raphael/Documents/hackathon/server-side/controllers/test.py']),
                data = [req.body.arg1, req.body.arg2],
                dataString = '';

            py.stdout.on('data', function (data) {
                var textChunk = data.toString('utf8');// buffer to string

                util.log(textChunk);
                dataString += data.toString();
            });
            py.stdout.on('end', function () {
                //console.log('Sum of numbers=', dataString);
            });
            py.stdin.write(JSON.stringify(data));
            py.stdin.end();
            res.sendStatus(200);

        },
        medicationName: function (req, res) {
            console.log(req.body);
            var spawn = require('child_process').spawn,
                py = spawn('python', ['/home/raphael/Documents/hackathon/server-side/controllers/test.py']),
                data = [req.body.data],
                dataString = '';

            py.stdout.on('data', function (data) {
                var textChunk = data.toString('utf8');// buffer to string

                util.log(textChunk);
                dataString += data.toString();
            });
            py.stdout.on('end', function () {
                //console.log('Sum of numbers=', dataString);
            });
            py.stdin.write(JSON.stringify(data));
            py.stdin.end();
            res.sendStatus(200);
        }
    };
    function runPythonScript(res) {
        var spawn = require('child_process').spawn;
        py = spawn('python', ["/home/raphael/Documents/hackathon/server-side/controllers/assign1.py"]);
        py.stdout.on('data', function (chunk) {
            var textChunk = chunk.toString('utf8');// buffer to string

            util.log(textChunk);
        });
        py.stdout.on('end', (code) => {
            res.sendStatus(200);
        })
    }
    return requestController;
}