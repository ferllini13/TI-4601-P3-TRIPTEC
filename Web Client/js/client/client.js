var app = angular.module("B2")

app.config(function ($routeProvider) {
    $routeProvider
        .when("/client", {
            templateUrl: "./../html/client/home.html",
            controller: 'clientController'
        })
        .when("/client/book/:name", {
            templateUrl: "./../html/client/book.html",
            controller: 'clientController'
        })
        .when("/userdata", {
            templateUrl: "./../html/client/userdata.html",
            controller: 'clientController'
        })
});


app.controller('clientController', function ($scope,$routeParams, connectApi) {


    $scope.user =JSON.parse(localStorage.getItem('user'));

    console.log($scope.user);

    //$scope.user={};
    
    console.log($routeParams.name);

    $scope.userId = localStorage.getItem('userId');

    $scope.reservacion = {
        idClient: $scope.userId,
        name: $routeParams.name,
        clientsAmount: '',
        checkIn: new Date(),
        checkOut: new Date(),
        needs: [],
        additionals: []
    }


    $scope.Book = function(){
        connectApi.httpPost("cliente/book/",$scope.reservacion).then(function(data){
            console.log(data.data.resultado)

        });
    }



    
  $scope.addNeeds = function(new_schedule){
    if ($scope.reservacion.needs == null || $scope.reservacion.needs == undefined)
      $scope.reservacion.needs = [];
    if (new_schedule != '')
      $scope.reservacion.needs.push(new_schedule);new_schedule='';
  }

  $scope.addAdditionals = function(new_activity){
    if ($scope.reservacion.additionals == null || $scope.reservacion.additionals == undefined)
      $scope.reservacion.additionals = [];
    if (new_activity != '')
      $scope.reservacion.additionals.push(new_activity);new_schedule2='';
  }



    

})



