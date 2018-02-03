
module.exports = function (app) {
    request = app.serverSide.controllers.requestController;
    app.get('/runScript', request.runScript);
    app.post('/sendMedicationName',request.medicationName);
    app.post('/sendAllergy',request.sendAllergy);
    app.post('/sendProblem',request.sendProblem);
};