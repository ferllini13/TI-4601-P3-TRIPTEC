var app = angular.module("B2")

app.config(function ($routeProvider) {
    $routeProvider
        .when("/history", {
            templateUrl: "./../html/client/history.html",
            controller: 'historyController'
        })
});


app.controller('historyController', function ($scope,$routeParams, connectApi) {

    $scope.history = [
        {id:1, tour: 'Talamanca'} ,
        {id:2, tour: 'Guanacaste'} ,
        {id:3, tour: 'Isla del coco'} ,
        {id:4, tour: 'Volcan irazu'},
        {id:5, tour: 'Limon'}
    ];


})
