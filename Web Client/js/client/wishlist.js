var app = angular.module("B2")

app.config(function ($routeProvider) {
    $routeProvider
        .when("/wishlist", {
            templateUrl: "./../html/client/wishlist.html",
            controller: 'wishlistController'
        })
});


app.controller('wishlistController', function ($scope, connectApi) {



})

