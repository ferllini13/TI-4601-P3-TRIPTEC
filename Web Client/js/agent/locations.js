
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



  $scope.default_schema = {
    name: "",
    direction: "",
    long: "",
    lat: "",
    description: "",
    activities: "",
    price: "",
    type: "",
    image: "",
    rating: "",
    cellphone: "",
    schedule: "",
    website: ""
  }


  $scope.default_schema2 = {
    name: "La concha de la lora",
    direction: "Cerca del tec",
    long: -10,
    lat: 10,
    description: "Un lugar feliz",
    activities: "un monton de cosas por hacer",
    price: 25000,
    type: "hotel",
    image: "",
    rating: 4.7,
    cellphone: 88888888,
    schedule: "L-V 4:00 pm",
    website: "www.laconchadelora.net"
  }

  $scope.schema = $scope.default_schema;



  $scope.addData = function(){
    $scope.data.lat = $scope.data.geometry.location.lat();
    $scope.data.long = $scope.data.geometry.location.lng();
    if ($scope.data.photos != undefined && $scope.data.photos != null && $scope.data.photos-length > 0)
      $scope.data.image = $scope.data.photos[0].getUrl();
    if ($scope.data.lat != undefined  && $scope.data.long != undefined){
      connectApi.httpPost("sitio/Register",$scope.data)
      .then(function(data){
          $scope.getAllData();
          $scope.data = Object.assign({}, $scope.default_schema);
      });
    }
    
    
  }


  $scope.dataLst = ["a", "b", "c"];
  $scope.data = {};
  $scope.setData = function (data) {
    console.log(data);
    console.log("data");
    $scope.data = data;
  }

  $scope.updateData = function(){
    connectApi.httpPut("sitio/readAll/"+$scope.diagnostico.id+"/updatediagnosticoCatalogo",$scope.diagnostico)
    .then(function(data){
        $scope.getAllData();
    });
    $scope.centro = Object.assign({}, $scope.diagnostico);

  }


  

  $scope.getAllData = function () {
    console.log("calling: " + SERVER_IP + 'sitio/readAll/');
    connectApi.httpGet('sitio/readAll/')
      .then(function (data) {
        console.log(data);
        console.log(data.data != null && data.data != undefined && data.data.status);
        if (data.data != null && data.data != undefined && data.data.status) {
          $scope.dataLst = data.data.resultado;

        }
      });
  }


  $scope.getAllData();



  //------------------------------------------------------------------

  $scope.result = undefined;
  $scope.details = undefined;
  $scope.lat = undefined;
  $scope.lng = undefined;

  $scope.placeData = {
    type: undefined,
    lat: undefined,
    lng: undefined,
    image: undefined,
    name: undefined,
    rating: undefined,
    tel: undefined,
    schedule: undefined,
    website: undefined
  }


  

  $scope.writeData = function () {
    $scope.placeData.lat = details.type
    $scope.placeData.lat = details.geometry.location.lat();
    $scope.placeData.lng = details.geometry.location.lng();
    $scope.placeData.image = details.photos[0].getUrl();
    $scope.placeData.name = details.name;
    $scope.placeData.rating = details.rating;
    $scope.placeData.tel = details.international_phone_number;
    $scope.placeData.schedule = details.opening_hours.periods;
    $scope.placeData.website = details.website;
  }

  //watch form for changes


  $scope.detail = "Detail";

  $scope.callback = function(result,status){
    $scope.data = result[0];
    $scope.$apply();
  }


  $scope.addSchedule = function(new_schedule){
    if ($scope.data.schedule == null || $scope.data.schedule == undefined)
      $scope.data.schedule = [];
    if (new_schedule != '')
      $scope.data.schedule.push(new_schedule);new_schedule='';
  }

  $scope.addActivity = function(new_activity){
    if ($scope.data.activities == null || $scope.data.activities == undefined)
      $scope.data.activities = [];
    if (new_activity != '')
      $scope.data.activities.push(new_activity);new_activity='';
  }

  $scope.GetLocation = function () {
    //var geocoder = new google.maps.Geocoder;
    let latlng = { lat: parseFloat($scope.lat), lng: parseFloat($scope.lng) }

    // geocoder.geocode({'location':latlng}, function(results, status) {
    //   if (status === 'OK')
    //       console.log(results)
    //   }); 


    map = new google.maps.Map({
      center: latlng,
      zoom: 17
    });

    //service.nearbySearch({ location: latlng, radius: 5, type: ['establishment'] }, $scope.callback);

    var local = "";
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({ location: latlng, radius: 5, type: ['establishment'] }, $scope.callback);

    /*
    var res = service.nearbySearch({ location: latlng, radius: 5, type: ['establishment'] },
      function (results, status, pagination) {
        console.log(results)
        for (x = 0; x < results.length; x++) {
          console.log(results[x].name)
          local = local.concat(String(results[x].name + "\ "));
          console.log(local);
        }
        $scope.autocomplete = local;
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          console.log("Status OK");
          $scope.data = {
            name: results[0].name,
            direction: "",
            long: "",
            lat: "",
            description: "",
            activities: "",
            price: "",
            type: "",
            image: "",
            rating: results[0].rating,
            cellphone: "",
            schedule: "",
            website: ""
          }
        }
        
      });

      */

    console.log("service ready!");



  }


  $scope.watchForm = function () {
    return $scope.form
  };

})



