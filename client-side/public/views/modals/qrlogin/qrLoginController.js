/**
 * Created by guilherme on 23/03/17.
 */

app.controller('qrLoginCtrl', function($scope,$rootScope,$state,$timeout,$mdDialog) {
    $scope.showGreetingqr = false;

    $scope.onSuccess = function(data) {
        console.log(data);
        $mdDialog.hide();
        // if(data) {
        //     var datas = {
        //         USER: "no",
        //         data: data
        //     };
        //     $rootScope.req('/login', datas, 'POST', function (success) {
        //         sessionStorage.setItem("token", success.token);
        //         sessionStorage.setItem("tipoProfissional", success.tipoProfissional);
        //         $mdDialog.hide();
        //         $state.go('home');
        //     }, function (err) {
        //         $scope.msg_error = "QR-Code inválido";
        //     });
        // }
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