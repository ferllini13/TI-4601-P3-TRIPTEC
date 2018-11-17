var app = angular.module("B2", ["ngRoute", 'angular.filter','ngAutocomplete']);

const SERVER_IP = "http://localhost:3000/";


app.config(function($routeProvider) {
    $routeProvider
    .when("/login", {
        templateUrl : "./../html/Login.html",
        controller : 'loginCtrl'
    })
    .otherwise({
        redirectTo: '/login'
    });
});


app.controller('loginCtrl', function($scope,$location,connectApi){
    $scope.user={};
	$scope.starPage=function(){//condiciones iniciales
		localStorage= null;
        document.getElementById('myForm').clear;                        
    };

    $scope.checkUser =  function(){//verificacion de la existencia de un usuario	
        connectApi.httpPost("login/1/login",{username: $scope.user.usr,password:$scope.user.pws}).then(function(data){
            console.log(data.data.resultado)
            if (data.data.resultado==null){
                alert("datos erroneos");
                $location.url("main");
            }
            else {
                localStorage.setItem('userName', $scope.user.usr);
		        localStorage.setItem('userId', data.data.resultado.cedula);
                localStorage.setItem('userRol', data.data.resultado.tipo);
                if (data.resultado.tipo=="patient") {$location.url("expediente/cita-paciente");}
                else if (data.resultado.tipo=="doctor") {$location.url("expediente/cita-doctor");}
                else if (data.resultado.tipo=="secretary") {$location.url("expediente/cita-secre");}
                else if (data.resultado.tipo=="admi") {$location.url("administrator");}
            }    
        });
    };
})


app.controller('menuCtrl',function($scope,$location){
    $scope.userName=localStorage.getItem('userName');
	$scope.patient=false;
    $scope.doctor=false;
    $scope.secre=false;
    $scope.admi=false;


    $scope.checkRol=function(){
        $scope.userName=localStorage.getItem('userName');
        console.log( $scope.userName)
        let rol = localStorage.getItem('userRol');

        if (rol=="patient") {$scope.patient=true;$scope.doctor=false;$scope.secre=false;$scope.admi=false;}
        else if (rol=="doctor") {$scope.patient=false;$scope.doctor=true;$scope.secre=false;$scope.admi=false;}
        else if (rol=="secretary") {$scope.patient=false;$scope.doctor=false;$scope.secre=true;$scope.admi=false;}
        else if (rol=="admi") {$scope.patient=false;$scope.doctor=false;$scope.secre=false;$scope.admi=true;}
        else {$scope.patient=false;$scope.doctor=false;$scope.secre=false;$scope.admi=false;}
    };


    $scope.logOut=function(){//cierra sesion y se hacegura de borrar el cache de los datos del usuario
		localStorage.clear();
		localStorage= null;
        $location.url('login');
    };


})


app.directive('menu', function() {
    return {
       templateUrl: 'html/Menu.html',
         controller:"menuCtrl"
   };
})


/////////// hay que corregir la que el mae hace con las respueestas despues de jalarlas , pero este es el get y el post basico 

//sevice que sobrecarga http con el fin de hacerlo accesible desde todos los comtroladores
app.service('connectApi',function($http){
	//implementacion del gttp.get
	this.httpGet= function(method){
        console.log("connectApi get!");
		var getPromise=$http.get(SERVER_IP+method).then(function (response){
            console.log(response);
	    	return response;
		});
		return getPromise;
    },
    
    this.httpGetR= function(method,requestJson){
		var getPromise=$http.get(SERVER_IP+method, JSON.stringify(requestJson)).then(function (response){
            console.log(response);
	    	return angular.fromJson(response);
		});
		return getPromise;
	},
	//implementacion del http.post
	this.httpPost= function(method,requestJson){
		var postPromise=$http.post(SERVER_IP+method, JSON.stringify(requestJson)).then(function(response) {
            console.log(response);
	  		return angular.fromJson(response);
       	});
		return postPromise;
    }
    
    //implementacion del http.post
	this.httpPut= function(method,requestJson){
		var postPromise=$http.put(SERVER_IP+method, JSON.stringify(requestJson)).then(function(response) {
            console.log(response);
	  		return angular.fromJson(response);
       	});
		return postPromise;
    }
    

    //implementacion del http.post
	this.httpDelete= function(method){
		var postPromise=$http.delete(SERVER_IP+method).then(function(response) {
            console.log(response);
	  		return angular.fromJson(response);
       	});
		return postPromise;
	}
})

