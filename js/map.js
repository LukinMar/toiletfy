var map; //Will contain map object.
var marker = false; ////Has the user plotted their location marker?

        
//Function called to initialize / create the map.
//This is called when the page has loaded.
function initMap() {
     navigator.geolocation.getCurrentPosition(function(position) {
         (me = new google.maps.LatLng(position.coords.latitude, position.coords.longitude))
         map.setCenter(me),
         map.setZoom(15);
        });

    map = new google.maps.Map(document.getElementById('map'), {
    gestureHandling: "greedy",
    enableHighAccuracy: true,
    });

    google.maps.event.addListener(map, 'click', function(event) {                
        var clickedLocation = event.latLng;
        //If the marker hasn't been added.
        if(marker === false){
            //Create the marker.
            marker = new google.maps.Marker({
                position: clickedLocation,
                map: map,
                draggable: true //make it draggable
            });
            //Listen for drag events!
            google.maps.event.addListener(marker, 'dragend', function(event){
                markerLocation();
            });
        } else{
            //Marker has already been added, so just change its location.
            marker.setPosition(clickedLocation);
        }

        //Get the marker's location.
        markerLocation();
    });
}
        
//This function will get the marker's current location and then add the lat/long
//values to our textfields so that we can save the location.
function markerLocation(){
    //Get location.
    var currentLocation = marker.getPosition(),
    t = new google.maps.Geocoder();

    t.geocode({ latLng: currentLocation }, function(clickedLocation, e) {
        if (e != google.maps.GeocoderStatus.OK)
        return alert("Geocode failure: " + e), !1;
        processAddress(clickedLocation[0].formatted_address);
    });

    document.getElementById('valorlat').value = currentLocation.lat(); //latitude
    document.getElementById('valorlong').value = currentLocation.lng(); //longitude

}

  function processAddress(o) {
    $("#endereco").val(o);
  }
        
//Load the map when the page has finished loading.
google.maps.event.addDomListener(window, 'load', initMap);