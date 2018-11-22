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


    $scope.userId =localStorage.getItem('userId');


    $scope.getHistory = function(){
        connectApi.httpGet("cliente/"+ $scope.userId+"/wishlist/").then(function(data){
            console.log(data.data.resultado)

            var names = data.data.resultado;
            var uniqueNames = [];
            $.each(names, function(i, el){
                if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
            });

            $scope.wishlist=uniqueNames;
            console.log("Wishlist");
        });
    }

    $scope.getHistory();



})

