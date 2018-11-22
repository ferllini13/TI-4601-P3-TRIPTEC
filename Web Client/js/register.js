var app = angular.module("B2")

app.config(function ($routeProvider) {
    $routeProvider
        .when("/register", {
            templateUrl: "./../html/register.html",
            controller: 'registerController'
        })
});


app.controller('registerController', function ($scope, connectApi) {
    $scope.userData = {};
    $scope.clientData = {};

    $scope.errorMessage = '';
    $scope.clientData.birthdate = new Date();


    $scope.user = {
        id: '',
        type: 0,
        user: '',
        password: '',
        name : '',
        correo : '',
        phone : '',
        birth : new Date()
    };

    $scope.register = function () {
        
        var errorDetected = false;

        /*
        if (!isNaN($scope.clientData.phone)) {
            console.log('phone is a number');
            $scope.errorMessage = '';
        }
        else {
            $scope.errorMessage = ('Error: Invalid phone number inserted!');
        }
        */


        if (!errorDetected) {
            connectApi.httpPost("login/register",$scope.user)
                .then(function (data) {
                    
                });
        }


    }

})


