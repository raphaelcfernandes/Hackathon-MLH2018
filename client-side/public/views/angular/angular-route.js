var app = angular.module('SantaUTIApp', ['ngMaterial', 'ui.router', 'ngStorage', 'qrScanner', 'moment-picker', 'ngMessages']);

app.run(function ($rootScope, $location, $window, $state, $stateParams, $http) {

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    moment.locale('pt-br');
    $rootScope.reqApiURL = '';

    $rootScope.req = function (service, params, type, success, error) {
        $http({
            url: $rootScope.reqApiURL + service,
            method: type,
            data: params
        })
            .then(function (response) {
                success(response.data);
            }, function (err) {
                error(err.data);
            });

    };

    $rootScope.reqWithToken = function (service, params, type, success, error) {
        $http({
            url: $rootScope.reqApiURL + service,
            method: type,
            data: params,
            headers: {
                'access_token': sessionStorage.getItem("token")
            }
        })
            .then(function (response) {
                success(response.data);
            }, function (err) {
                error(err.data);
            });
    };
});
/**
 * Configure the Routes
 */
app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider, $rootScope) {
    $stateProvider
        .state('home', {
            url: '/',
            views: {
                '': {
                    templateUrl: '../home/home.html',
                    controller: 'homeCtrl'
                }
            }
        })

    function usuarioLogado($http) {
        var req = {
            method: 'POST',
            url: '/verifyToken',
            data: { token: sessionStorage.getItem("token") }
        };
        return $http(req);
    }
    //    $locationProvider.html5Mode(true);
}]);
app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

app.config(['momentPickerProvider', function (momentPickerProvider) {
    momentPickerProvider.options({
        /* Picker properties */
        locale: 'pt-br',
        position: "bottom-right",
        autoclose: true,
        /* Extra: Views properties */
        minutesStep: 1
    })
}]);

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('orange');
});


