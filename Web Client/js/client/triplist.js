var app = angular.module("B2")

app.config(function ($routeProvider) {
    $routeProvider
        .when("/triplist/", {
            templateUrl: "./../html/client/triplist.html",
            controller: 'tripListController'
        })
        .when("/tripinfo/:id", {
            templateUrl: "./../html/client/tripdetail.html",
            controller: 'tripInfoController'
        })
});




app.controller('tripListController', function ($scope,$routeParams, connectApi) {

    console.log($routeParams.id);

    $scope.placelist = [];

    $scope.getSites = function(){
        connectApi.httpPost("sitio/login/",{user: $scope.user.usr,password:$scope.user.pws}).then(function(data){
            console.log(data.data.resultado)

            $scope.placelist=data.data.resultado;
        });
    }

})

