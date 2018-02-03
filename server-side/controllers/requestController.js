var PythonShell = require('python-shell');
var spawn = require("child_process");
var util = require("util");

module.exports = function (app) {
    var requestController = {
        runScript: function (req, res, next) {
            runPythonScript(res)
        }
    };
    function runPythonScript(res) {        
        var spawn = require('child_process').spawn;
        py = spawn('python',["/home/raphael/Documents/hackathon/server-side/controllers/assign1.py"]);
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