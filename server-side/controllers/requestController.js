var PythonShell = require('python-shell');
var spawn = require("child_process");
var util = require("util");
var process = require("process")

module.exports = function (app) {
    var requestController = {
        runScript: function (req, res, next) {
            runPythonScript(res)
        },
        sendAllergy: function (req, res) {
            var spawn = require('child_process').spawn,
                py = spawn('python', ['/home/raphael/Documents/hackathon/server-side/controllers/append_to_database.py']),
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
                py = spawn('python', ['/home/raphael/Documents/hackathon/server-side/controllers/append_to_database.py']),
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
            var spawn = require('child_process').spawn,
                py = spawn('python', ['/home/raphael/Documents/hackathon/server-side/controllers/bar_code.py']),
                data = [req.body.data],
                dataString = '';
            var result;
            py.stdout.on('data', function (data) {
                var textChunk = data.toString('utf8');// buffer to string
                util.log(textChunk);

                res.json({ suggest: textChunk });
            });
            py.stdin.write(JSON.stringify(data));
            py.stdin.end();
        },
        imageToText: function (req, res) {
            var spawn = require('child_process').spawn,
                py = spawn('python', ['/home/raphael/Documents/hackathon/server-side/controllers/parse_eob.py']), data = req.body, dataString = '';
            py.stdout.on('data', function (data) {
                var textChunk = data.toString('utf8');// buffer to string
                util.log(textChunk);
            });
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