'use strict';
angularMvcTest.controller('dashboardcontroller', ['$scope', '$http', '$window', '$rootScope', '$mdDialog', '$timeout', '$filter', '$mdMedia', function ($scope, $http, $window, $rootScope, $mdDialog, $timeout, $filter, $mdMedia) {
    debugger;
    //if ($rootScope.loggedin) {
    //    $window.location.reload()
    //}    
    $rootScope.loggedin = true;
    $rootScope.URL = 'dashboard';
}]);