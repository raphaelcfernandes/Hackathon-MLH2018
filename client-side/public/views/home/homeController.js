app.controller('homeCtrl', function ($scope, $state, $rootScope, $timeout, $mdDialog, $sce, $interval, $stateParams) {

    $scope.result = "teste";
    $scope.allergy='';
    $scope.problem='';

    $scope.add = function(){
        var data = {
            arg1: "ALLERGY",
            arg2: $scope.allergy
        }
        $rootScope.req('/sendAllergy', data, 'POST', function (success) {
            console.log(success);
           // $scope.allergy = '';
        }, function (err) {
            console.log(err);
        });
    }

    $scope.addProblem = function(){
        var data = {
            arg1: "PROBLEM",
            arg2: $scope.problem
        }
        $rootScope.req('/sendProblem', data, 'POST', function (success) {
            console.log(success);
           // $scope.allergy = '';
        }, function (err) {
            console.log(err);
        });
    }
    $scope.openQrl = function (ev) {
        var opQR = $mdDialog.show({
            templateUrl: '../modals/qrlogin/qrLogin.html',
            controller: 'homeCtrl',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })

    }

    $scope.onSuccess = function (data) {
        if (data) {
            var datas = {
                data: data
            };
            $rootScope.req('/sendMedicationName', datas, 'POST', function (success) {
                console.log(success);
                $scope.result = success.result;
                $mdDialog.hide();
            }, function (err) {
                $scope.msg_error = "QR-Code inválido";
            });
        }
    };

    $scope.onError = function (error) {
        $scope.msg_error = "Reposicione o QR-Code";
        $scope.showGreetingqr = true;
        $timeout(function () {
            $scope.showGreetingqr = false;
        }, 5000);
    };
});
