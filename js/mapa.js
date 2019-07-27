var map;
var idInfoBoxAberto;
var infoBox = [];
var markers = [];
var marker;
var geocoder;
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function initialize() {
  var latlng = new google.maps.LatLng(-18.8800397, -47.05878999999999);
  var options = {
    zoom: 5,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("mapa"), options);

  geocoder = new google.maps.Geocoder();

  marker = new google.maps.Marker({
    map: map,
    draggable: true
  });

  marker.setPosition(latlng);
}

initialize();

navigator.geolocation.getCurrentPosition(
  function(position) {
    initialLocation = new google.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );
    map.setCenter(initialLocation);
    marker.setPosition(initialLocation);
  },
  function(error) {
    // callback de erro
    alert("Erro ao obter localização!");
    console.log("Erro ao obter localização.", error);
  },
  options
);

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
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
    });

    map.fitBounds(latlngbounds);
  });
}

carregarPontos();
