/**
 * Created by raphael on 3/20/17.
 */
app.controller('ModalInstanceCtrl', function ($scope, $mdDialog) {
    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };
});
/*
var isThemeRed = true;
$scope.showAdvanced = function(ev) {
    $mdDialog.show({
        controller: 'ModalInstanceCtrl',
        templateUrl: '../modals/comum/modalConfirmacaoExclusao.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
    })
        .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
            console.log($scope.status);
        }, function() {
            $scope.status = 'You cancelled the dialog.';
            console.log($scope.status);
        });
};*/
