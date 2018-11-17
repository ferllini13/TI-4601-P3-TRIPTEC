var app = angular.module("B2")

app.config(function ($routeProvider) {
    $routeProvider
        .when("/wishlist", {
            templateUrl: "./../html/client/wishlist.html",
            controller: 'wishlistController'
        })
});


app.controller('wishlistController', function ($scope, connectApi) {
    $scope.wishlist = [
        {id:1, tour: 'Talamanca'} ,
        {id:2, tour: 'Guanacaste'} ,
        {id:3, tour: 'Isla del coco'} ,
        {id:4, tour: 'Volcan irazu'},
        {id:5, tour: 'Limon'}
    ];



})

