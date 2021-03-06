﻿var map, marker, geocoder, me;
function addYourLocationButton(n, r) {
  document.getElementById("showMe").addEventListener("click", function() {
    navigator.geolocation
      ? navigator.geolocation.getCurrentPosition(function(o) {
          var e = o.coords.latitude,
            t = o.coords.longitude,
            a = new google.maps.LatLng(o.coords.latitude, o.coords.longitude);
          r.setPosition(a),
            n.setCenter(a),
            n.setZoom(17),
            getLatitude(e),
            getLongitude(t),
            getAddress(e, t);
        })
      : alert("Não foi possível usar a sua localização");
  });
}
function initialize() {
  navigator.geolocation &&
    navigator.geolocation.getCurrentPosition(
      function(o) {
        (me = new google.maps.LatLng(o.coords.latitude, o.coords.longitude)),
          marker.setPosition(me),
          map.setCenter(me),
          map.setZoom(17);
      },
      function(o) {
        alert("Não foi possível usar a sua localização");
      }
    );
  var o = {
    enableHighAccuracy: !0,
    center: new google.maps.LatLng(-22.9334923, -43.4167982),
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: !1,
    gestureHandling: "greedy"
  };
  (map = new google.maps.Map(document.getElementById("mapa"), o)),
    (geocoder = new google.maps.Geocoder()),
    (marker = new google.maps.Marker({ map: map })),
    addYourLocationButton(map, marker);
}
function getAddress(o, e) {
  var t = new google.maps.Geocoder(),
    a = new google.maps.LatLng(o, e);
  t.geocode({ latLng: a }, function(o, e) {
    if (e != google.maps.GeocoderStatus.OK)
      return alert("Geocode failure: " + e), !1;
    processAddress(o[0].formatted_address);
    
  });
}
function processAddress(o) {
  $("#endereco").val(o);
}
function getLatitude(o) {
  $("#valorlat").val(o);
}
function getLongitude(o) {
  $("#valorlong").val(o);
}
initialize();
