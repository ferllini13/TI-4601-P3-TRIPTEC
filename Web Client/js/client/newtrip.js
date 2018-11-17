var app = angular.module("B2")

app.config(function ($routeProvider) {
    $routeProvider
        .when("/newtrip/:id", {
            templateUrl: "./../html/client/newtrip.html",
            controller: 'newtripController'
        })
        .when("/triplist", {
            templateUrl: "./../html/client/triplist.html",
            controller: 'newtripController'
        })
        .when("/tripinfo/:id", {
            templateUrl: "./../html/client/tripdetail.html",
            controller: 'newtripController'
        })
});


app.controller('newtripController', function ($scope, connectApi) {



    $scope.searchInput = '';

    $scope.placelist = [
        {name:'Hotel CR', stars:4},
        {name:'Hotel CR 1', stars:1},
        {name:'Hotel CR 2', stars:5},
        {name:'Hotel CR 3', stars:2}

    ];


    $scope.goToNewTrip = function(place){
        window.location.href = '#/newtrip'; 
        //$location.path('#/newtrip') ;
    }


})

