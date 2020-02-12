var map;
var idInfoBoxAberto;
var infoBox = [];
var markers = [];
var marker;
var geocoder;
var me;

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
  firstChild.title = "Sua localização";
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
  });

  firstChild.addEventListener("click", function() {
    var imgX = "0";
    var animationInterval = setInterval(function() {
      if (imgX == "-18") imgX = "0";
      else imgX = "-18";
      $("#you_location_img").css("background-position", imgX + "px 0px");
    }, 500);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var latlng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
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
    navigator.geolocation.getCurrentPosition(
      function(pos) {
        me = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        marker.setPosition(me);
        map.setCenter(me);
        map.setZoom(17);
      },
      function(error) {}
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
    gestureHandling: "greedy",
    styles: [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#212121"
          }
        ]
      },
      {
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#757575"
          }
        ]
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#212121"
          }
        ]
      },
      {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
          {
            color: "#757575"
          }
        ]
      },
      {
        featureType: "administrative.country",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9e9e9e"
          }
        ]
      },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#bdbdbd"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#757575"
          }
        ]
      },
      {
        featureType: "poi.attraction",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "poi.business",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          {
            color: "#181818"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#616161"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#1b1b1b"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#2c2c2c"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#8a8a8a"
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          {
            color: "#373737"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#3c3c3c"
          }
        ]
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [
          {
            color: "#4e4e4e"
          }
        ]
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#616161"
          }
        ]
      },
      {
        featureType: "transit",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#757575"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#0d0d0d"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#3d3d3d"
          }
        ]
      }
    ]
  };

  map = new google.maps.Map(document.getElementById("mapa"), mapOptions);

  geocoder = new google.maps.Geocoder();

  marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    map: map,
    icon: "img/marker.png"
  });
  marker.addListener("click", toggleBounce);
  addYourLocationButton(map, marker);
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
initialize();

function abrirInfoBox(id, marker) {
  if (
    typeof idInfoBoxAberto == "number" &&
    typeof infoBox[idInfoBoxAberto] == "object"
  ) {
    infoBox[idInfoBoxAberto].close();
  }

  infoBox[id].open(map, marker);
  idInfoBoxAberto = id;
}

function carregarPontos() {
  $.getJSON("js/pontos.json", function(pontos) {
    var latlngbounds = new google.maps.LatLngBounds();

    $.each(pontos, function(index, ponto) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(ponto.Latitude, ponto.Longitude),
        icon: "img/marcador.png"
      });

      var myOptions = {
        content: "<p>" + ponto.Descricao + "</p>",
        pixelOffset: new google.maps.Size(-150, 0)
      };

      infoBox[ponto.Id] = new InfoBox(myOptions);
      infoBox[ponto.Id].marker = marker;

      infoBox[ponto.Id].listener = google.maps.event.addListener(
        marker,
        "click",
        function(e) {
          abrirInfoBox(ponto.Id, marker);
        }
      );

      markers.push(marker);

      latlngbounds.extend(marker.position);
    });

    var markerCluster = new MarkerClusterer(map, markers, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
      maxZoom: 10
    });
  });
}

carregarPontos();
