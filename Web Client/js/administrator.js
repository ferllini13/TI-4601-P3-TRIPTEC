var app=angular.module("B2")

app.config(function($routeProvider) {
    $routeProvider
    .when("/administrator", {
        templateUrl : "./../html/administrator/home.html",
        controller : 'adminController'
    })
    .when("/administrator/reporte/tratamiento", {
        templateUrl : "./../html/administrator/reporte_tratamiento.html",
        controller : 'adminController'
    })
    .when("/administrator/reporte/diagnostico", {
        templateUrl : "./../html/administrator/reporte_diagnostico.html",
        controller : 'adminController'
    })
    .when("/administrator/reporte/rango/diagnostico", {
        templateUrl : "./../html/administrator/rango_diagnostico.html",
        controller : 'adminController'
    })
});


app.controller('adminController', function($scope,connectApi){


    $scope.reportTratamientos = function(){
        connectApi.httpGet("administrador/1/reporteTratamientos")
        .then(function(data){
            $scope.reporte_trat = data.data.resultado;
        });
    }

    $scope.reporteDiagnosticada = function(){
        connectApi.httpGet("administrador/1/reporteDiagnosticada")
        .then(function(data){
            $scope.reporte_diag = data.data.resultado;
        });
    }


    $scope.rangoDiagnosticada = function(){
        connectApi.httpGet("administrador/1/rangoDiagnosticos")
        .then(function(data){
            console.log(data.data);
            $scope.rango_diag = data.data;
        });
    }

    $scope.reportTratamientos();
    $scope.reporteDiagnosticada();
    $scope.rangoDiagnosticada();

})