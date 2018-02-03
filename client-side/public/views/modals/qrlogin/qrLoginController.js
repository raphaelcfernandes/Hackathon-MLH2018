/**
 * Created by guilherme on 23/03/17.
 */

app.controller('qrLoginCtrl', function($scope,$rootScope,$state,$timeout,$mdDialog) {
    $scope.showGreetingqr = false;

    $scope.onSuccess = function(data) {
        if(data) {
            var datas = {
                data: data
            };
            $rootScope.req('/sendMedicationName', datas, 'POST', function (success) {
                console.log(success);
                $mdDialog.hide();
            }, function (err) {
                $scope.msg_error = "QR-Code inválido";
            });
        }
    };

    $scope.onError = function(error) {
            $scope.msg_error = "Reposicione o QR-Code";
            $scope.showGreetingqr = true;
            $timeout(function () {
                $scope.showGreetingqr = false;
            }, 5000);
    };

    /*
    Fechar a janela com um tempo de delay para animação...
     */
    // $scope.close = function() {
    //     close({
    //     }, 500);
    //
    // };
    //
    // $scope.cancel = function() {
    //
    //     $element.modal('hide');
    //
    //     close({
    //     }, 500);
    // };


});