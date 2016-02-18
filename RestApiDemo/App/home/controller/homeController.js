'use strict';
angularMvcTest.controller('homecontroller', ['$scope', '$http', '$window', '$rootScope', '$mdDialog', '$timeout', '$filter', '$mdMedia',  function ($scope, $http, $window, $rootScope, $mdDialog, $timeout, $filter, $mdMedia) {
    debugger;
    $scope.page = 'App/demo/view/demo.html';
    $rootScope.URL = 'home';
    $scope.showAdvanced = function (ev) {
        $mdDialog.show({
            //controller: DialogController,
            templateUrl: 'LoginModalContent.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false
        })
        .then(function (answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function () {
            $scope.status = 'You cancelled the dialog.';
        });
    };
    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
            $window.location = 'index.html#/';
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
            $window.location = 'index.html#/';
        };
        $scope.answer = function (answer) {
            debugger
            $mdDialog.hide(answer);
            $window.location = 'index.html#/';
        };
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
        $window.location = 'index.html#/';
    };

    $scope.Login = function (req) {
        $mdDialog.cancel();
        $rootScope.HttpLoading = true;
        var request = {};
        request.Email = req.email;
        request.Password = req.password;
        request.TableName = "user";
        var JsonData = JSON.stringify(request);
        $http.post('/api/user/search', JsonData).then(function (res) {
            $rootScope.HttpLoading = false;
            debugger;
            if (res.data.Success && res.data.Result.length>0) {
                $scope.UserInfo = res.data.Result[0];
                $rootScope.loggedin = true;               
                $window.location = '#/dashboard';
            }
            else {
                alert("Invalid Username or Password");
            }
        });
       
    }

    $scope.CreateUser = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'CreateAccountModal.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false
        })
        .then(function (answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function () {
            $scope.status = 'You cancelled the dialog.';
        });
    };

    $scope.SignUp = function (req) {
        req.TableName = "user";
        $mdDialog.cancel();
        $rootScope.HttpLoading = true;
        var JsonData = JSON.stringify(req);
        $http.post('/api/user/insert', JsonData).then(function (res) {
            $rootScope.HttpLoading = false;
            debugger;
            if (res.data.Success && res.data.Result.length > 0) {
                alert('Registered Successfully');
            }
            else {
                alert("Registration Failed");
            }
        });

    }

    //Facebook-Code Starts
    // This is called with the results from from FB.getLoginStatus().
    $scope.statusChangeCallback=function (response) {
        debugger;
        console.log('statusChangeCallback');
        console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            testAPI();
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            document.getElementById('status').innerHTML = 'Please log ' +
              'into this app.';
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            document.getElementById('status').innerHTML = 'Please log ' +
              'into Facebook.';
        }
    }

    // This function is called when someone finishes with the Login
    // Button.  See the onlogin handler attached to it in the sample
    // code below.
    $scope.checkLoginState=function () {debugger
        FB.getLoginStatus(function (response) {debugger
            statusChangeCallback(response);
        });
    }

    //$scope.FbInit = function () {debugger
        window.fbAsyncInit = function () {debugger
            FB.init({
                appId: '499733753533889',
                cookie: true,  // enable cookies to allow the server to access
                // the session
                xfbml: true,  // parse social plugins on this page
                version: 'v2.2' // use version 2.2
            });

            // Now that we've initialized the JavaScript SDK, we call
            // FB.getLoginStatus().  This function gets the state of the
            // person visiting this page and can return one of three states to
            // the callback you provide.  They can be:
            //
            // 1. Logged into your app ('connected')
            // 2. Logged into Facebook, but not your app ('not_authorized')
            // 3. Not logged into Facebook and can't tell if they are logged into
            //    your app or not.
            //
            // These three cases are handled in the callback function.

            FB.getLoginStatus(function (response) {debugger
                statusChangeCallback(response);
            });

        };
        //FB.login();
    //}
    //$scope.FbInit();
    //Add in Index.Html
    //// Load the SDK asynchronously
    //(function (d, s, id) {
    //    var js, fjs = d.getElementsByTagName(s)[0];
    //    if (d.getElementById(id)) return;
    //    js = d.createElement(s); js.id = id;
    //    js.src = "//connect.facebook.net/en_US/sdk.js";
    //    fjs.parentNode.insertBefore(js, fjs);
    //}(document, 'script', 'facebook-jssdk'));

    // Here we run a very simple test of the Graph API after login is
    // successful.  See statusChangeCallback() for when this call is made.
    var testAPI=function () {debugger
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function (response) {
            console.log('Successful login for: ' + response.name);
            document.getElementById('status').innerHTML =
              'Thanks for logging in, ' + response.name + '!';
        });
    }

      //(function (d, s, id) {
      //    var js, fjs = d.getElementsByTagName(s)[0];
      //    if (d.getElementById(id)) return;
      //    js = d.createElement(s); js.id = id;
      //    js.src = "//connect.facebook.net/en_US/sdk.js";
      //    fjs.parentNode.insertBefore(js, fjs);
      //}(document, 'script', 'facebook-jssdk'));
}]);
