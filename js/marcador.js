var map;

var marker;
var geocoder;
var me;

function addYourLocationButton(map, marker) {
  document.getElementById("showMe").addEventListener("click", function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var latlng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        marker.setPosition(latlng);
        map.setCenter(latlng);
        map.setZoom(17);
        getLatitude(latitude);
        getLongitude(longitude);
        getAddress(latitude, longitude);
      });
    } else {
      alert("Não foi possível usar a sua localização");
    }
  });
}

function initialize() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(pos) {
        me = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        marker.setPosition(me);
        map.setCenter(me);
        map.setZoom(17);
      },
      function(error) {
        alert("Não foi possível usar a sua localização");
      }
    );
  }
  var latlng = new google.maps.LatLng(-22.9334923, -43.4167982);
  var zoom = 10;

  var mapOptions = {
    enableHighAccuracy: true,
    center: latlng,
    zoom: zoom,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: false,
    gestureHandling: "greedy"
  };

  map = new google.maps.Map(document.getElementById("mapa"), mapOptions);

  geocoder = new google.maps.Geocoder();

  marker = new google.maps.Marker({
    map: map
  });

  addYourLocationButton(map, marker);
}

function getAddress(myLatitude, myLongitude) {
  var geocoder = new google.maps.Geocoder();
  var location = new google.maps.LatLng(myLatitude, myLongitude);

  geocoder.geocode({ latLng: location }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      // if geocode success
      processAddress(results[0].formatted_address);
    } else {
      alert("Geocode failure: " + status);
      return false;
    }
  });
}

function processAddress(address) {
  $("#endereco").val(address);
}

function getLatitude(latitude) {
  $("#valorlat").val(latitude);
}
function getLongitude(longitude) {
  $("#valorlong").val(longitude);
}

initialize();
