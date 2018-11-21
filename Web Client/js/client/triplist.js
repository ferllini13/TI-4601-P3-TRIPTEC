
app.controller('tripListController', function ($scope,$routeParams, connectApi) {

    console.log($routeParams.id);

    $scope.searchInput = '';
        $scope.placelist = [
            /*
        {name:'Hotel CR', stars:4},
        {name:'Hotel CR 1', stars:1},
        {name:'Hotel CR 2', stars:5},
        {name:'Hotel CR 3', stars:2}
            */
    ];


     var Lista = [];

    $scope.GetLocation= function(latitud, longitud, type,radio){
        let latlng={lat:parseFloat( latitud),lng:parseFloat( longitud)}
  
        map = new google.maps.Map({
            center: latlng,
            zoom: 17
        });
        

        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({location: latlng, radius: radio, type: type},
          function(results, status, pagination) {
            Lista = results;
            console.log(Lista);
          });
  
        
        console.log(Lista);
        
    }


    $scope.getLocationTest  = function(){

        $scope.GetLocation(10.6286725,-85.4431958000000, ["establishment"],1);
        $scope.placelist  = Lista;
    }




    
/*
    $scope.GetTrip = function(){
        $scope.GetLocation("","","",5);
    }
*/
})

