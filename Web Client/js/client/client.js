var app = angular.module("B2")

app.config(function ($routeProvider) {
    $routeProvider
        .when("/client", {
            templateUrl: "./../html/client/home.html",
            controller: 'clientController'
        })
});


app.controller('clientController', function ($scope, connectApi) {



    

})



