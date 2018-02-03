/**
 * Created by raphael on 2/16/17.
 */
app.controller('toolbarCtrl', function ($scope,$rootScope, $state) {
    $scope.runScript = function () {
        $rootScope.req('/runScript',null, 'GET', function (success) {
            console.log("here")
        }, function (err) {
            console.log(err);
        });
    };
});