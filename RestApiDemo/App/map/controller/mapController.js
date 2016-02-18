'use strict';
angularMvcTest.controller('mapcontroller', ['$scope', '$http', '$window', '$rootScope', '$mdDialog', '$timeout', '$filter', '$mdMedia', function ($scope, $http, $window, $rootScope, $mdDialog, $timeout, $filter, $mdMedia) {
    debugger;
    $rootScope.URL = 'map';

    //$scope.ShowMap = false;
    $scope.ShowMap = true;
    $scope.SearchMap = function (address) {
        debugger;
        if (address != null) {
            //Removing data for direction services-starts
            $scope.direction = {};
            $scope.ShowDirection = false;
            //Removing data for direction services-ends
            $rootScope.HttpLoading = true;
            $scope.citiesInfo = [];
            $scope.markers = [];
            var pos = (address.formatted_address == undefined) ? address : address.formatted_address;
            //To get Map by Country and Zip Code
            //$http.get('http://maps.googleapis.com/maps/api/geocode/json?components=country:IN|postal_code:' + pos + '&sensor=true').then(function (res) {
            //To get Map by Zip Code
            $http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + pos + '&sensor=true').then(function (res) {
                debugger
                $rootScope.HttpLoading = false;
                console.log(res.data);
                $scope.citiesInfo = res.data;
                $scope.LocateZip = [];
                angular.forEach($scope.citiesInfo.results, function (value, key) {
                    var eachAddressInfo = {};
                    eachAddressInfo.Id = value.place_id;
                    eachAddressInfo.city = value.formatted_address.split(',')[0];
                    eachAddressInfo.desc = value.formatted_address;
                    eachAddressInfo.lat = value.geometry.location.lat;
                    eachAddressInfo.long = value.geometry.location.lng;
                    $scope.LocateZip.push(eachAddressInfo);
                });
                if ($scope.LocateZip.length > 0) {
                    //$scope.ShowMap = true;
                    $scope.MarkEachCities();
                }
                else {
                    alert("No Result found");
                }
            });
        }
       
    }

    //$http.get('data/IndianPinCodes.json').then(function (res) {
    //    debugger

    //});

    $scope.FilterMap = function () {
        debugger
        //$scope.ShowMap = false;
        $scope.filteredZip = [];
        angular.forEach($scope.LocateZip, function (value, key) {
            angular.forEach(MasterData, function (v, k) {
                debugger
                if (parseInt(v.lat) == parseInt(value.lat)) {
                    $scope.filteredZip.push(v);
                }
            });

        });
        $scope.LocateZip = [];

        $scope.LocateZip = $scope.filteredZip;
        if ($scope.LocateZip.length > 0) {
            $scope.markers = [];
            $scope.MarkEachCities();
        }
        else {
            $scope.markers = [];
        }
        //$scope.ShowMap = true;
    }


    var MasterData = [
                   {
                       city: 'Patna',
                       desc: 'Patna Junction,Patna, Bihar',
                       zip: '800026',
                       lat: 25.6028,
                       long: 85.1375
                   },
                   {
                       city: 'New Delhi',
                       desc: 'New Delhi,Karol Bagh',
                       zip: '110002',
                       lat: 28.6629,
                       long: 77.2100
                   },
                   {
                       city: 'Jaipur, Rajasthan',
                       desc: 'The Pink City of India',
                       zip: '115802',
                       lat: 26.9000,
                       long: 75.8000
                   },
                   {
                       city: 'Mumbai, Maharastra',
                       desc: 'Film City',
                       zip: '805026',
                       lat: 18.9750,
                       long: 72.8258
                   },
                   {
                       city: 'Bangalore',
                       desc: 'HSR Layout',
                       zip: '560103',
                       lat: 12.9100,
                       long: 77.6400
                   },
                    {
                        city: 'Bangalore',
                        desc: 'BTM Layout',
                        zip: '560103',
                        lat: 12.9526,
                        long: 77.6400
                    },
                    {
                        city: 'Bangalore',
                        desc: 'Kormangala',
                        zip: '560103',
                        lat: 12.9000,
                        long: 77.6400
                    },
                     {
                         city: 'Kolkata',
                         desc: 'Applied Optics and Photonics, University of Calcutta',
                         zip: '560103',
                         lat: 22.567587,
                         long: 88.415398
                     },
                      {
                          city: 'Kolkata',
                          desc: 'Jadavpur University',
                          zip: '560103',
                          lat: 22.499313,
                          long: 88.371849
                      },
                       {
                           city: 'Kolkata',
                           desc: 'Heritage Institute of Technology',
                           zip: '560103',
                           lat: 22.516525,
                           long: 88.418213
                       },
                        {
                            city: 'Bangalore',
                            desc: 'Electronic City',
                            zip: '560103',
                            lat: 12.839939,
                            long: 77.677003
                        },
                         {
                             city: 'Bangalore',
                             desc: 'Kormangala',
                             zip: '560103',
                             lat: 12.997121,
                             long: 77.669232
                         },
                         {
                             city: 'Goa',
                             desc: 'Goa',
                             zip: '560103',
                             lat: 15.299326,
                             long: 74.123996
                         },
                         {
                             city: 'Pune',
                             desc: 'Pune',
                             zip: '560103',
                             lat: 18.520430,
                             long: 73.856744
                         }

    ];



    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

    var createMarker = function (info) {

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.city
            //draggable: true

        });
        //$scope.temp = marker;
        marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

        //On Click of Marker to show location info box
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent('<h6 class="text-black">' + marker.title + '</h6>' + marker.content);
            infoWindow.open($scope.map, marker);
        });

        //Event Fired when Map is dragged
        google.maps.event.addListener($scope.map, 'dragend', function () {
            //alert("Map dragged");
            //In event we will get the current location
            //var latitude = event.latLng.lat();
            //var longitude = event.latLng.lng();
            //console.log(latitude + ', ' + longitude);
            $scope.FilterMap();
        });

        //Event Fired when Map Clicked
        google.maps.event.addListener($scope.map, 'click', function () {
            //alert("Map click");
            //var latitude = event.latLng.lat();
            //var longitude = event.latLng.lng();
            //console.log(latitude + ', ' + longitude);
            //$scope.FilterMap(latitude, longitude);
            //$scope.FilterMap();
        });
        $scope.markers.push(marker);
        //google.maps.event.addListener(marker, 'drag', function (event) {
        //    debugger
        //    //placeMarker(event.latLng);
        //});

    }

    //var DragMap = {
    //    zoom: 15,
    //    center: new google.maps.LatLng(12.52,75.52),
    //    mapTypeId: google.maps.MapTypeId.TERRAIN
    //}


    $scope.MarkEachCities = function () {
        var mapOptions = {
            //events: {
            //    dragend: function (event)
            //    {
            //        console.log("Map dragged");
            //    },
            //    click: function (event) {
            //        console.log("Map clcik");
            //    }
            //},
            zoom: 12,
            center: new google.maps.LatLng($scope.LocateZip[0].lat, $scope.LocateZip[0].long),
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            scrollwheel: false
        }

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        var cities = $scope.LocateZip;
        for (var i = 0; i < cities.length; i++) {
            createMarker(cities[i]);
        }
    }

    //$scope.InitMap = function () {
    //    var mapOptions = {
    //        zoom: 12,
    //        center: new google.maps.LatLng(12.12, 75.25),
    //        mapTypeId: google.maps.MapTypeId.TERRAIN,
    //        scrollwheel: false
    //    }
    //    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    //}


    //Direction Serivce      
    $scope.ShowDirection = false;
    $scope.Direction = function (req) {
        $scope.location = null;
        $rootScope.HttpLoading = true;
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: { lat: 41.85, lng: -87.65 },
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            scrollwheel: false
        });
        directionsDisplay.setMap(map);
        $timeout(function () {
            calculateAndDisplayRoute(directionsService, directionsDisplay, req);
            $rootScope.HttpLoading = false;
        }, 500);       
    }

    //*********DISTANCE AND DURATION**********************// 
    //Type-1 Method
    //var calculateAndDisplayRoute = function (directionsService, directionsDisplay, navigation) {
    //    //Setting navigation chart to be displayed
    //    $scope.ShowDirection = true;
    //    directionsService.route({
    //        origin: navigation.startpoint.formatted_address,
    //        destination: navigation.endpoint.formatted_address,
    //        travelMode: google.maps.TravelMode.DRIVING
    //    }, function (response, status) {
    //        if (status === google.maps.DirectionsStatus.OK) {
    //            directionsDisplay.setDirections(response);               
    //            document.getElementById('dvPanel').innerHTML = "";
    //            directionsDisplay.setPanel(document.getElementById('dvPanel'));                
    //            //Code for getting Distance and Time
    //            //var distance = response.routes[0].legs[0].distance.text;
    //            //var duration = response.routes[0].legs[0].duration.text;
    //            //var dvDistance = document.getElementById("dvDistance");
    //            //dvDistance.innerHTML = "";
    //            //dvDistance.innerHTML += "Distance: " + distance + "<br />";
    //            //dvDistance.innerHTML += "Duration:" + duration;
    //            //DistanceDuration(navigation.startpoint.formatted_address, navigation.endpoint.formatted_address);
    //        } else {
    //            window.alert('Directions request failed due to ' + status);
    //        }
    //    });
    //}

    //*********DISTANCE AND DURATION**********************//
    //Type-2 Method
    //var DistanceDuration = function (source,destination) {
    //    var service = new google.maps.DistanceMatrixService();
    //    service.getDistanceMatrix({
    //        origins: source,
    //        destinations: destination,
    //        travelMode: google.maps.TravelMode.DRIVING,
    //        unitSystem: google.maps.UnitSystem.METRIC,
    //        avoidHighways: false,
    //        avoidTolls: false
    //    }, function (response, status) {
    //        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
    //            var distance = response.rows[0].elements[0].distance.text;
    //            var duration = response.rows[0].elements[0].duration.text;
    //            var dvDistance = document.getElementById("dvDistance");
    //            dvDistance.innerHTML = "";
    //            dvDistance.innerHTML += "Distance: " + distance + "<br />";
    //            dvDistance.innerHTML += "Duration:" + duration;

    //        } else {
    //            alert("Unable to find the distance via road.");
    //        }
    //    });
    //}

    //Demo-https://developers.google.com/maps/documentation/javascript/examples/directions-travel-modes
    ////
    $scope.initMap = function (req) {
        $scope.start = req.startpoint.formatted_address;
        $scope.end = req.endpoint.formatted_address;
        var markerArray = [];

        // Instantiate a directions service.
        var directionsService = new google.maps.DirectionsService;

        // Create a map and center it on Manhattan.
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: { lat: 40.771, lng: -73.974 }
        });

        // Create a renderer for directions and bind it to the map.
        var directionsDisplay = new google.maps.DirectionsRenderer({ map: map });

        // Instantiate an info window to hold step text.
        var stepDisplay = new google.maps.InfoWindow;

        // Display the route between the initial start and end selections.
        calculateAndDisplayRoute(
            directionsDisplay, directionsService, markerArray, stepDisplay, map);
        // Listen to change events from the start and end lists.
        var onChangeHandler = function () {
            calculateAndDisplayRoute(
                directionsDisplay, directionsService, markerArray, stepDisplay, map);
        };
        //document.getElementById('start').addEventListener('change', onChangeHandler);
        //document.getElementById('end').addEventListener('change', onChangeHandler);
    }

    function calculateAndDisplayRoute(directionsDisplay, directionsService,
        markerArray, stepDisplay, map) {
        // First, remove any existing markers from the map.
        for (var i = 0; i < markerArray.length; i++) {
            markerArray[i].setMap(null);
        }

        // Retrieve the start and end locations and create a DirectionsRequest using
        // WALKING directions.
        directionsService.route({
            origin: $scope.start,
            destination: $scope.end,
            travelMode: google.maps.TravelMode.DRIVING
        }, function (response, status) {
            // Route the directions and pass the response to a function to create
            // markers for each step.
            if (status === google.maps.DirectionsStatus.OK) {
                document.getElementById('warnings-panel').innerHTML =
                    '<b>' + response.routes[0].warnings + '</b>';
                directionsDisplay.setDirections(response);
                showSteps(response, markerArray, stepDisplay, map);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    function showSteps(directionResult, markerArray, stepDisplay, map) {
        // For each step, place a marker, and add the text to the marker's infowindow.
        // Also attach the marker to an array so we can keep track of it and remove it
        // when calculating new routes.
        var myRoute = directionResult.routes[0].legs[0];
        for (var i = 0; i < myRoute.steps.length; i++) {
            var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
            marker.setMap(map);
            marker.setPosition(myRoute.steps[i].start_location);
            attachInstructionText(
                stepDisplay, marker, myRoute.steps[i].instructions, map);
        }
    }

    function attachInstructionText(stepDisplay, marker, text, map) {
        google.maps.event.addListener(marker, 'click', function () {
            // Open an info window when the marker is clicked on, containing the text
            // of the step.
            stepDisplay.setContent(text);
            stepDisplay.open(map, marker);
        });
    }

}]);