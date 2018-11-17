var app = angular.module("B2")

app.config(function ($routeProvider) {
    $routeProvider
        .when("/history", {
            templateUrl: "./../html/client/history.html",
            controller: 'historyController'
        })
});


app.controller('historyController', function ($scope, connectApi) {



})
