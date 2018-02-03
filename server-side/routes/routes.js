
module.exports = function (app) {
    request = app.serverSide.controllers.requestController;
    app.get('/runScript', request.runScript);
};