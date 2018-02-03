app.controller('homeCtrl', function ($scope, $state, $rootScope, $timeout, $mdDialog, $sce, $interval, $stateParams) {
    $scope.openQrl = function (ev) {
        var opQR = $mdDialog.show({
            templateUrl: '../modals/qrlogin/qrLogin.html',
            controller: 'qrLoginCtrl',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })

    }

    var self = this;

    self.simulateQuery = false;
    self.isDisabled = false;

    // list of `state` value/display objects
    self.states = loadAll();
    self.querySearch = querySearch;
    self.searchTextChange = searchTextChange;

    self.newState = newState;

    function newState(state) {
        alert("Sorry! You'll need to create a Constitution for " + state + " first!");
    }

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch(query) {
        var results = query ? self.states.filter(createFilterFor(query)) : self.states,
            deferred;
        if (self.simulateQuery) {
            deferred = $q.defer();
            $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
            return deferred.promise;
        } else {
            return results;
        }
    }

    function searchTextChange(text) {
        $log.info('Text changed to ' + text);
    }

    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
        var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
                        Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
                        Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
                        Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
                        North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
                        South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
                        Wisconsin, Wyoming';

        return allStates.split(/, +/g).map(function (state) {
            return {
                value: state.toLowerCase(),
                display: state
            };
        });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(state) {
            return (state.value.indexOf(lowercaseQuery) === 0);
        };

    }



    /**
    Copyright 2016 Google Inc. All Rights Reserved. 
    Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
    **/
});