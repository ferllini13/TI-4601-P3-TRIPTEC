var app = angular.module("B2")

app.config(function ($routeProvider) {
    $routeProvider
        .when("/newtrip/:lat/:lng", {
            templateUrl: "./../html/client/newtrip.html",
            controller: 'newtripController'
        })
        .when("/triplist/:lat/:lng", {
            templateUrl: "./../html/client/newtrip.html",
            controller: 'tripListController'
        })
        .when("/tripinfo/:id", {
            templateUrl: "./../html/client/tripdetail.html",
            controller: 'tripInfoController'
        })
});


app.controller('newtripController', function ($scope,$routeParams, connectApi) {
    $scope.placelist = [];
    $scope.sites = []
    $scope.data={radio: undefined, type : []};
    
    $scope.addtype= function(type){ 

        if ($scope.data.type.includes(type)){
            $scope.data.type.splice($scope.data.type.indexOf(type), 1)
        }
        else{
            $scope.data.type.push(type)
        }
    }

    $scope.GetLocation= function(){

        console.log("cristofer loca")
        let latlng={lat:parseFloat(  $routeParams.lat),lng:parseFloat( $routeParams.lng)}
  
        map = new google.maps.Map({
            center: latlng,
            zoom: 17
        });
        

        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({location: latlng, radius:  $scope.data.radio, type:  $scope.data.type},
          function(results, status, pagination) {
              console.log(results)
                fill(service,results,$scope.data.type)        

          });
   }

   function fill(service ,data,types){
       var result=[];

       for (i = 0; i < data.length; i++) {
            for (x = 0; x < data[i].types.length; x++) {
                if (types.includes(data[i].types[x])){
                    service.getDetails({placeId: data[i].place_id}, function(place, status) {
                        result.push(place)
                        //console.log(place)
                    });
                }

        }
        }
        $scope.placelist = result;
   }



   $scope.addSite= function(site){
        //porner aqui lo del api y agregar sitios


   }
   
});





app.controller('tripListController', function ($scope,$routeParams, connectApi) {

    console.log($routeParams.id);

    $scope.placelist = [];

    $scope.getSites = function(){
        connectApi.httpPost("sitio/readAll/",{user: $scope.user.usr,password:$scope.user.pws}).then(function(data){
            console.log(data.data.resultado)

            $scope.placelist=data.data.resultado;
        });
    }

})



app.controller('tripInfoController', function ($scope,$routeParams, connectApi) {

    console.log($routeParams.id);


    $scope.getripInfo = function(){
        connectApi.httpPost("login/login/",{user: $scope.user.usr,password:$scope.user.pws}).then(function(data){
            console.log(data.data.resultado)

        });
    }

})

