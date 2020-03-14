var map,
  idInfoBoxAberto,
  marker,
  marker2,
  geocoder,
  me,
  infoBox = [],
  markers = [];
watcher = null;

var marcador = {
  url: "img/marker.png",
  scaledSize: new google.maps.Size(38, 38)
};

var marcadorPesquisa = {
  url: "img/markerPesquisa.png",
  scaledSize: new google.maps.Size(33, 42)
};

function addYourLocationButton(map, marker) {
  var controlDiv = document.createElement("div");
  var firstChild = document.createElement("button");
  firstChild.style.backgroundColor = "#fff";
  firstChild.style.border = "none";
  firstChild.style.outline = "none";
  firstChild.style.width = "40px";
  firstChild.style.height = "40px";
  firstChild.style.borderRadius = "2px";
  firstChild.style.boxShadow = "0 1px 4px rgba(0,0,0,0.3)";
  firstChild.style.cursor = "pointer";
  firstChild.style.marginRight = "10px";
  firstChild.style.padding = "0px";
  firstChild.title = "Sua Localização";
  controlDiv.appendChild(firstChild);

  var secondChild = document.createElement("div");
  secondChild.style.margin = "0 auto";
  secondChild.style.width = "18px";
  secondChild.style.height = "18px";
  secondChild.style.backgroundImage =
    "url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)";
  secondChild.style.backgroundSize = "180px 18px";
  secondChild.style.backgroundPosition = "0px 0px";
  secondChild.style.backgroundRepeat = "no-repeat";
  secondChild.id = "you_location_img";
  firstChild.appendChild(secondChild);

  google.maps.event.addListener(map, "dragend", function() {
    $("#you_location_img").css("background-position", "0px 0px");
    navigator.geolocation.clearWatch(watcher);
  });

  firstChild.addEventListener("click", function() {
    var imgX = "0";
    var animationInterval = setInterval(function() {
      if (imgX == "-18") imgX = "0";
      else imgX = "-18";
      $("#you_location_img").css("background-position", imgX + "px 0px");
    }, 500);
    if (navigator.geolocation) {
      watcher = navigator.geolocation.watchPosition(function(position) {
        var latlng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        console.log(position);
        marker.setPosition(latlng);
        map.setCenter(latlng);
        map.setZoom(17);
        clearInterval(animationInterval);
        $("#you_location_img").css("background-position", "-144px 0px");
      });
    } else {
      clearInterval(animationInterval);
      $("#you_location_img").css("background-position", "0px 0px");
    }
  });

  controlDiv.index = 1;
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
}

function initialize() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      (me = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      )),
        marker.setPosition(me),
        map.setCenter(me),
        map.setZoom(15.8);
    });
  }
  var e = {
    enableHighAccuracy: true,
    maximumAge: 1000,
    timeout: 5000,
    center: new google.maps.LatLng(-23.2971146,-59.3306172),
    zoom:3.3,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: false,
    rotateControl: true,
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
    (searchBox = new google.maps.places.SearchBox(
      document.getElementById("pac-input")
    )),
    (searchBoxMobile = new google.maps.places.SearchBox(
      document.getElementById("pac-input-mobile")
    )),
    google.maps.event.addListener(searchBox, "places_changed", function() {
      var places = searchBox.getPlaces();
      var bounds = new google.maps.LatLngBounds();
      var i, place;

      for (i = 0; (place = places[i]); i++) {
        console.log(place.geometry.location);
        bounds.extend(place.geometry.location);
        marker2.setPosition(place.geometry.location);
        navigator.geolocation.clearWatch(watcher);
      }
      map.fitBounds(bounds);
      map.setZoom(17);
    }),
    google.maps.event.addListener(
      searchBoxMobile,
      "places_changed",
      function() {
        var places = searchBoxMobile.getPlaces();
        var bounds = new google.maps.LatLngBounds();
        var i, place;

        for (i = 0; (place = places[i]); i++) {
          console.log(place.geometry.location);
          bounds.extend(place.geometry.location);
          marker2.setPosition(place.geometry.location);
          navigator.geolocation.clearWatch(watcher);
        }
        map.fitBounds(bounds);
        map.setZoom(17);
      }
    ),
    (geocoder = new google.maps.Geocoder()),
    (marker = new google.maps.Marker({
      map: map,
      icon: marcador
    })),
    (marker2 = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      map: map,
      icon: marcadorPesquisa
    })).addListener("click", toggleBounce),
    addYourLocationButton(map, marker);
}

function toggleBounce() {
  null !== marker2.getAnimation()
    ? marker2.setAnimation(null)
    : marker2.setAnimation(google.maps.Animation.BOUNCE);
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
