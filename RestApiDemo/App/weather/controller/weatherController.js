'use strict';
angularMvcTest.controller('weathercontroller', ['$scope', '$http', '$window', '$rootScope', '$mdDialog', '$timeout', '$filter', '$mdMedia', '$sce', function ($scope, $http, $window, $rootScope, $mdDialog, $timeout, $filter, $mdMedia, $sce) {
    debugger;
    $rootScope.URL = 'weather';
    $scope.Climate = function (address) {
        if (address != undefined) {
            $rootScope.HttpLoading = true;
            var location = (address.formatted_address == undefined) ? address : address.formatted_address;
            $http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + location + '%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys').then(function (res) {
                debugger;
                $rootScope.HttpLoading = false;
                $scope.ResObj = res.data.query.results.channel;
                $scope.desc = $sce.trustAsHtml($scope.ResObj.item.description);
            });
        }
    }
}]);