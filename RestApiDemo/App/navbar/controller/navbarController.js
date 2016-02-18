'use strict';
angularMvcTest.controller('navbarcontroller', ['$scope', '$http', '$window', '$rootScope', '$mdDialog', '$timeout', '$filter', '$mdMedia', function ($scope, $http, $window, $rootScope, $mdDialog, $timeout, $filter, $mdMedia) {
    debugger;
    //$rootScope.loggedin = false;
    //if ($window.location.hash === "#/") {
    //    $rootScope.URL = 'home';
    //}
    //if ($window.location.hash === "#/dashboard") {
    //    $rootScope.URL = 'dashboard';
    //}

    //var MenuIds=['home','vision','mission','contact','about','logout']
    //$scope.MenuClicked = function (event,req) {
    //    angular.element(req).addClass('active');
    //    angular.forEach(MenuIds, function (value, key) {
    //        angular.element(value).removeClass('active');
    //    });
    //}
    
    $scope.Logout = function () {
        $rootScope.loggedin = false;
        $rootScope.URL = 'home';
    }
    $(".button-collapse").sideNav();
}]);
