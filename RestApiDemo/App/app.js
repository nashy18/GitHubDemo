'use strict';
var angularMvcTest = angular.module('myApp', ['ngMaterial', 'ngRoute', 'google.places'])//, 'angular-noty'

// configure our routes
angularMvcTest.config(['$routeProvider', function ($routeProvider) {
    debugger
    $routeProvider
         // route for the home page
        .when('/', {
            templateUrl: 'App/home/view/home.html',
            //controller: 'homeController'
        }) // route for the about page
        .when('/aboutus', {
            templateUrl: 'App/aboutus/view/aboutus.html',
            //controller: 'dashboardcontroller'
        })

        // route for the about page
        .when('/dashboard', {
            templateUrl: 'App/dashboard/view/dashboard.html',
            //controller: 'dashboardcontroller'
        })
         .when('/vision', {
             templateUrl: 'App/missionandvision/view/missionandvision.html',
             //controller: 'dashboardcontroller'
         })
    .when('/contactus', {
        templateUrl: 'App/contactus/view/contactus.html',
        //controller: 'dashboardcontroller'
    })
        // route for the chat page
        .when('/chat', {
            templateUrl: 'App/chat/view/chat.html',
            //controller: 'contactController'
        })
    // route for the news page
        .when('/news', {
            templateUrl: 'App/news/view/news.html',
            //controller: 'contactController'
        })
    // route for the weather page
        .when('/weather', {
            templateUrl: 'App/weather/view/weather.html',
            //controller: 'contactController'
        })
    // route for the google map page
        .when('/map', {
            templateUrl: 'App/map/view/map.html',
            //controller: 'contactController'
        }).
        otherwise({
            redirectTo: '/404'
        });
}]);

'use strict';
angularMvcTest.controller('indexcontroller', ['$scope', '$http', '$window', '$rootScope', '$mdDialog', '$timeout', '$filter', '$mdMedia', function ($scope, $http, $window, $rootScope, $mdDialog, $timeout, $filter, $mdMedia) {
    debugger;
   
    $scope.clicked = false;
    $rootScope.HttpLoading = false;
    //$scope.showAdvanced = function (ev) {
    //    debugger
    //    $mdDialog.show({
    //        controller: DialogController,
    //        templateUrl: 'LoginModalContent.html',
    //        parent: angular.element(document.body),
    //        targetEvent: ev,
    //        clickOutsideToClose: true,
    //        fullscreen: $mdMedia('md') && $scope.customFullscreen
    //    })
    //    .then(function (answer) {
    //        $scope.status = 'You said the information was "' + answer + '".';
    //    }, function () {
    //        $scope.status = 'You cancelled the dialog.';
    //    });
    //    $scope.$watch(function () {
    //        return $mdMedia('md');
    //    }, function (sm) {
    //        $scope.customFullscreen = (sm === true);
    //    });
    //};
    //function DialogController($scope, $mdDialog) {
    //    $scope.hide = function () {
    //        $mdDialog.hide();
    //    };
    //    $scope.cancel = function () {
    //        $mdDialog.cancel();
    //    };
    //    $scope.answer = function (answer) {
    //        $mdDialog.hide(answer);
    //    };
    //}
    //$scope.showAdvanced = function(ev) {
    //    $mdDialog.show({
    //        controller: DialogController,
    //        templateUrl: 'LoginModalContent.html',
    //        parent: angular.element(document.body),
    //        targetEvent: ev,
    //        clickOutsideToClose:false
    //    })
    //    .then(function(answer) {
    //        $scope.status = 'You said the information was "' + answer + '".';
    //    }, function() {
    //        $scope.status = 'You cancelled the dialog.';
    //    });
    //};
    //function DialogController($scope, $mdDialog) {
    //    $scope.hide = function() {
    //        $mdDialog.hide();
    //    };
    //    $scope.cancel = function() {
    //        $mdDialog.cancel();
    //    };
    //    $scope.answer = function(answer) {debugger
    //        $mdDialog.hide(answer);
    //    };
    //};
    debugger;
    if ($window.location.hash === "#/404") {
        $rootScope.URL = '404';
    }
}]);

'use strict';
angularMvcTest.factory('signalRSvc', ['$', '$rootScope', function ($, $rootScope) {debugger
    return {
        proxy: null,
        initialize: function (acceptGreetCallback) {
            debugger
            //Getting the connection object
            connection = $.hubConnection();

            //Creating proxy
            this.proxy = connection.createHubProxy('helloWorldHub');

            //Starting connection
            connection.start();

            //Attaching a callback to handle acceptGreet client call
            this.proxy.on('acceptGreet', function (message) {
                $rootScope.$apply(function () {
                    acceptGreetCallback(message);
                });
            });
        },
        sendRequest: function (callback) {
            //Invoking greetAll method defined in hub
            this.proxy.invoke('greetAll');
        }
    }
}]);

'use strict';
angularMvcTest.factory("demoservice", ["$http",
   function ($http) {
       return {
               test: function () {
                   alert("This is our dummy function. $http is provided: " + (!!$http));
               },

               initialize : function () {debugger
                    //Getting the connection object
               var connection = $.hubConnection();
  
                    //Creating proxy
               this.proxy = connection.createHubProxy('helloWorldHub');
  
                    //Starting connection
               connection.start();
  
                    //Publishing an event when server pushes a greeting message
               this.proxy.on('acceptGreet', function (message) {
                   $rootScope.$emit("acceptGreet",message);
               });
           },
  
            sendRequest: function () {
                //Invoking greetAll method defined in hub
                this.proxy.invoke('greetAll');
            }
       }
   }]);


'use strict';
angularMvcTest.factory("chatservice", ['$rootScope','Hub', '$timeout', function($rootScope, Hub, $timeout){
    //declaring the hub connection
    var hub = new Hub('employee', {

        //client side methods
        listeners:{
            'lockEmployee': function (id) {
                var employee = find(id);
                employee.Locked = true;
                $rootScope.$apply();
            },
            'unlockEmployee': function (id) {
                var employee = find(id);
                employee.Locked = false;
                $rootScope.$apply();
            }
        },

        //server side methods
        methods: ['lock','unlock'],

        //query params sent on initial connection
        queryParams:{
            'token': 'exampletoken'
        },

        //handle connection error
        errorHandler: function(error){
            console.error(error);
        },

        //specify a non default root
        //rootPath: '/api

        stateChanged: function(state){
            switch (state.newState) {
                case $.signalR.connectionState.connecting:
                    //your code here
                    break;
                case $.signalR.connectionState.connected:
                    //your code here
                    break;
                case $.signalR.connectionState.reconnecting:
                    //your code here
                    break;
                case $.signalR.connectionState.disconnected:
                    //your code here
                    break;
            }
        }
    });

    var edit = function (employee) {
        hub.lock(employee.Id); //Calling a server method
    };
    var done = function (employee) {
        hub.unlock(employee.Id); //Calling a server method
    }

    return {
        editEmployee: edit,
        doneWithEmployee: done
    };
}]);
