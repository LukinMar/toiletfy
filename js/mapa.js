var map,
  idInfoBoxAberto,
  marker,
  geocoder,
  me,
  infoBox = [],
  markers = [];
function addYourLocationButton(a, r) {
  var e = document.createElement("div"),
    o = document.createElement("button");
  (o.style.backgroundColor = "#fff"),
    (o.style.border = "none"),
    (o.style.outline = "none"),
    (o.style.width = "40px"),
    (o.style.height = "40px"),
    (o.style.borderRadius = "2px"),
    (o.style.boxShadow = "0 1px 4px rgba(0,0,0,0.3)"),
    (o.style.cursor = "pointer"),
    (o.style.marginRight = "10px"),
    (o.style.padding = "0px"),
    (o.title = "Sua localização"),
    e.appendChild(o);
  var t = document.createElement("div");
  (t.style.margin = "0 auto"),
    (t.style.width = "18px"),
    (t.style.height = "18px"),
    (t.style.backgroundImage =
      "url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)"),
    (t.style.backgroundSize = "180px 18px"),
    (t.style.backgroundPosition = "0px 0px"),
    (t.style.backgroundRepeat = "no-repeat"),
    (t.id = "you_location_img"),
    o.appendChild(t),
    google.maps.event.addListener(a, "dragend", function() {
      $("#you_location_img").css("background-position", "0px 0px");
    }),
    o.addEventListener("click", function() {
      var e = "0",
        t = setInterval(function() {
          (e = "-18" == e ? "0" : "-18"),
            $("#you_location_img").css("background-position", e + "px 0px");
        }, 500);
      navigator.geolocation
        ? navigator.geolocation.watchPosition(function(position) {
          console.log(position)
            var o = new google.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            );
            r.setPosition(o),
              a.setCenter(o),
              a.setZoom(17),
              clearInterval(t),
              $("#you_location_img").css("background-position", "-144px 0px");
          })
        : (clearInterval(t),
          $("#you_location_img").css("background-position", "0px 0px"));
    }),
    (e.index = 1),
    a.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(e);
}
function initialize() {
  navigator.geolocation &&
    navigator.geolocation.watchPosition(
      function(position) {
        (me = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)),
        console.log(position),
          marker.setPosition(me),
          map.setCenter(me),
          map.setZoom(17);
      },
    );
  var e = {
    enableHighAccuracy: true,
    timeout: 30000,
    maximumAge:30000,
    center: new google.maps.LatLng(-22.9334923, -43.4167982),
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: false,
    gestureHandling: "greedy",
    styles: [
      { elementType: "geometry", stylers: [{ color: "#212121" }] },
      { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
      {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [{ color: "#757575" }]
      },
      {
        featureType: "administrative.country",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9e9e9e" }]
      },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#bdbdbd" }]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#757575" }]
      },
      { featureType: "poi.attraction", stylers: [{ visibility: "off" }] },
      { featureType: "poi.business", stylers: [{ visibility: "off" }] },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#181818" }]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#616161" }]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#1b1b1b" }]
      },
      {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [{ color: "#2c2c2c" }]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#8a8a8a" }]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{ color: "#373737" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#3c3c3c" }]
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [{ color: "#4e4e4e" }]
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [{ color: "#616161" }]
      },
      {
        featureType: "transit",
        elementType: "labels.text.fill",
        stylers: [{ color: "#757575" }]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#0d0d0d" }]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#3d3d3d" }]
      }
    ]
  };
  (map = new google.maps.Map(document.getElementById("mapa"), e)),
  (searchBox = new google.maps.places.SearchBox(document.getElementById('pac-input'))),
  (searchBoxMobile = new google.maps.places.SearchBox(document.getElementById('pac-input-mobile'))),
  (google.maps.event.addListener(searchBox, 'places_changed', function(){
    var places = searchBox.getPlaces();
    var bounds = new google.maps.LatLngBounds();
    var i, place;

    for (i=0; place=places[i]; i++){
        console.log(place.geometry.location);
        bounds.extend(place.geometry.location);
        marker.setPosition(place.geometry.location);
    }
    map.fitBounds(bounds);
    map.setZoom(17);
  })),
  (google.maps.event.addListener(searchBoxMobile, 'places_changed', function(){
    var places = searchBoxMobile.getPlaces();
    var bounds = new google.maps.LatLngBounds();
    var i, place;

    for (i=0; place=places[i]; i++){
        console.log(place.geometry.location);
        bounds.extend(place.geometry.location);
        marker.setPosition(place.geometry.location);
    }
    map.fitBounds(bounds);
    map.setZoom(17);
  })),
    (geocoder = new google.maps.Geocoder()),
    (marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      map: map,
      icon: "img/marker2.png"
    })).addListener("click", toggleBounce),
    addYourLocationButton(map, marker);
}

function toggleBounce() {
  null !== marker.getAnimation()
    ? marker.setAnimation(null)
    : marker.setAnimation(google.maps.Animation.BOUNCE);
}
function abrirInfoBox(e, o) {
  "number" == typeof idInfoBoxAberto &&
    "object" == typeof infoBox[idInfoBoxAberto] &&
    infoBox[idInfoBoxAberto].close(),
    infoBox[e].open(map, o),
    (idInfoBoxAberto = e);
}
function carregarPontos() {
  $.getJSON("https://toiletfy.herokuapp.com/js/pontos.json", function(e) {
    var r = new google.maps.LatLngBounds();
    $.each(e, function(e, o) {
      var t = new google.maps.Marker({
          position: new google.maps.LatLng(o.Latitude, o.Longitude),
          icon: "img/marcador.png"
        }),
        a = {
          content: "<p>" + o.Descricao + "</p>",
          pixelOffset: new google.maps.Size(-150, 0)
        };
      (infoBox[o.Id] = new InfoBox(a)),
        (infoBox[o.Id].marker = t),
        (infoBox[o.Id].listener = google.maps.event.addListener(
          t,
          "click",
          function(e) {
            abrirInfoBox(o.Id, t);
          }
        )),
        markers.push(t),
        r.extend(t.position);
    });
    new MarkerClusterer(map, markers, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
      maxZoom: 10
    });
  });
}
initialize(), carregarPontos();
