var app = angular.module("B2")

app.config(function ($routeProvider) {
    $routeProvider
        .when("/newtrip", {
            templateUrl: "./../html/client/newtrip.html",
            controller: 'newtripController'
        })
});


app.controller('newtripController', function ($scope, connectApi) {


    $scope.placelist = [
        {name:'Hotel CR', stars:4},
        {name:'Hotel CR 1', stars:1},
        {name:'Hotel CR 2', stars:5},
        {name:'Hotel CR 3', stars:2}

    ];


})

