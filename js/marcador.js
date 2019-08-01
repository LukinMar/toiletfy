var map;
var marker;
var geocoder;
var me;

function addYourLocationButton(map, marker) {
  document.getElementById("showMe").addEventListener("click", function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var latlng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        marker.setPosition(latlng);
        map.setCenter(latlng);
        map.setZoom(17);
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=AIzaSyAjpzomu3rr8iX1yMYdOgkevViVGzsbGLU`
        )
          .then(res => res.json())
          .then(data => populateCard(data.results));
        document.getElementById("endereco").value = latlng;
      });
    } else {
      alert("Não foi possível usar a sua localização");
    }
  });

  controlDiv.index = 1;
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
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

initialize();
var map;

var marker;
var geocoder;
var me;

function addYourLocationButton(map, marker) {
  document.getElementById("showMe").addEventListener("click", function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude; // set latitude variable
        var longitude = position.coords.longitude;
        var latlng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        marker.setPosition(latlng);
        map.setCenter(latlng);
        map.setZoom(17);
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
  var geocoder = new google.maps.Geocoder(); // create a geocoder object
  var location = new google.maps.LatLng(myLatitude, myLongitude); // turn coordinates into an object

  geocoder.geocode({ latLng: location }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      // if geocode success
      processAddress(results[0].formatted_address); // if address found, pass to processing function
    } else {
      alert("Geocode failure: " + status); // alert any other error(s)
      return false;
    }
  });
}

function processAddress(address) {
  $("#endereco").val(address); // write address to field
}

initialize();
