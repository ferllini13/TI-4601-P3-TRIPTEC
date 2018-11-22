 
var app = angular.module("B2")

app.config(function ($routeProvider) {
    $routeProvider
        .when("/agent", {
            templateUrl: "./../html/agent/home.html",
            controller: 'agentLocationsController'
        })
        .when("/agent/add", {
          templateUrl: "./../html/agent/locations.html",
          controller: 'agentLocationsController'
      })
      .when("/agent/list", {
        templateUrl: "./../html/agent/list-location.html",
        controller: 'agentLocationsController'
    })
});


app.controller('agentLocationsController', function ($scope, connectApi) {
    $scope.result = undefined;
    $scope.details = undefined;
    $scope.lat = undefined;
    $scope.lng = undefined;
     
    $scope.placeData = {
      type: undefined,
      lat:undefined,
      lng:undefined, 
      image : undefined, 
      name: undefined, 
      rating : undefined,
      tel: undefined,
      schedule: undefined,
      website: undefined
    }  


    $scope.dataLst = ["a","b","c"];
    $scope.info = "";
    $scope.setData = function(data){
      console.log(data);
      console.log("data");
      $scope.info = data;
    }

    $scope.writeData=function(){ 
      $scope.placeData.lat = details.type
      $scope.placeData.lat = details.geometry.location.lat();
      $scope.placeData.lng = details.geometry.location.lng();
      $scope.placeData.image=details.photos[0].getUrl();
      $scope.placeData.name =  details.name;
      $scope.placeData.rating =  details.rating;
      $scope.placeData.tel=  details.international_phone_number;
      $scope.placeData.schedule=  details.opening_hours.periods;
      $scope.placeData.website=  details.website;
    }
    //watch form for changes

    $scope.GetLocation= function(){
      //var geocoder = new google.maps.Geocoder;
      let latlng={lat:parseFloat( $scope.lat),lng:parseFloat( $scope.lng)}
      
      // geocoder.geocode({'location':latlng}, function(results, status) {
      //   if (status === 'OK')
      //       console.log(results)
      //   }); 


      map = new google.maps.Map({
          center: latlng,
          zoom: 17
      });
      
      var local= "";
      var service = new google.maps.places.PlacesService(map);  
      var res = service.nearbySearch({location: latlng, radius: 5, type: ['establishment']},
        function(results, status, pagination) {
          console.log(results)
          for (x = 0; x<results.length; x++){
            console.log(results[x].name)
            local= local.concat(String(results[x].name+"\ "));
            console.log(local);
          }
          $scope.autocomplete=local;

        });

      console.log("service ready!");



    }


    $scope.watchForm = function () {
      return $scope.form
    };

})



