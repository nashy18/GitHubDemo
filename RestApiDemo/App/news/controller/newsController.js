'use strict';
angularMvcTest.controller('newscontroller', ['$scope', '$http', '$window', '$rootScope', '$mdDialog', '$timeout', '$filter', '$mdMedia', '$sce', function ($scope, $http, $window, $rootScope, $mdDialog, $timeout, $filter, $mdMedia, $sce) {
    debugger;
    $rootScope.URL = 'news';
    //function load() {debugger
    //    var feed = "http://rss.cnn.com/rss/cnn_topstories.rss";
    //    new GFdynamicFeedControl(feed, "feedControl");

    //}
    //google.load("feeds", "1");
    //google.setOnLoadCallback(load);
    $scope.loadFeed = function (url) {debugger
        $http.get('api/news?url=' + url).then(function (res) {
            $rootScope.HttpLoading = true;
            debugger;
            if (res.data.Success) {
                $rootScope.HttpLoading = false;
                $scope.RssFeed = res.data.News.responseData.feed;
                $scope.News = res.data.News.responseData.feed.entries;
                angular.forEach($scope.News, function (value, key) {
                    value.MoreInfo = $sce.trustAsHtml(value.content);
                });
            }
            else {
                alert("Somthing went wrong");
            }
        });
    }
    $scope.loadFeed('http://timesofindia.feedsportal.com/c/33039/f/533917/index.rss');
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}]);