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
                },
                'navbar': {
                    templateUrl: '../toolbar/toolbar.html',
                    controller: 'toolbarCtrl'
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

    $mdThemingProvider.definePalette('paletaAzul', {
        '50': '337ab7',
        '100': '337ab7',
        '200': '337ab7',
        '300': '337ab7',
        '400': '337ab7',
        '500': '337ab7',
        '600': '337ab7',
        '700': '337ab7',
        '800': '337ab7',
        '900': '337ab7',
        'A100': '337ab7',
        'A200': '337ab7',
        'A400': '337ab7',
        'A700': '337ab7',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
        // on this palette should be dark or light

        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
            '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });
    $mdThemingProvider.definePalette('paletaBranca', {
        '50': 'fff',
        '100': 'fff',
        '200': 'fff',
        '300': 'fff',
        '400': 'fff',
        '500': 'fff',
        '600': 'fff',
        '700': 'fff',
        '800': 'fff',
        '900': 'fff',
        'A100': 'fff',
        'A200': 'fff',
        'A400': 'fff',
        'A700': 'fff',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
        // on this palette should be dark or light

        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
            '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });
    $mdThemingProvider
        .theme('temaNavbar')
        .primaryPalette('paletaAzul')
        .warnPalette('red')
        .accentPalette('blue')
        .backgroundPalette('paletaBranca')
    $mdThemingProvider
        .theme('temaToolbar')
        .primaryPalette('paletaBranca')
        .warnPalette('paletaBranca')
        .accentPalette('paletaBranca')
        .backgroundPalette('paletaBranca');
});