var app=angular.module("B2")

app.config(function($routeProvider) {
    $routeProvider
    .when("/main", {
        templateUrl : "./../html/main.html",
        controller : 'mainCtrl'
    })
    });


app.controller('mainCtrl', function($scope){
    $scope.shit="hola2222";

})



