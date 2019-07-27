var geocoder;
var map;
var marker;

function initialize() {
  var latlng = new google.maps.LatLng(-22.9137531, -43.5860654, 11);
  var options = {
    zoom: 5,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("map_canvas"), options);

  geocoder = new google.maps.Geocoder();

  marker = new google.maps.Marker({
    map: map,
    draggable: true
  });

  marker.setPosition(latlng);
}

// verifica se o navegador tem suporte a geolocalização
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      // callback de sucesso
      // ajusta a posição do marker para a localização do usuário
      marker.setPosition(
        new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        )
      );
    },
    function(error) {
      // callback de erro
      alert("Erro ao obter localização!");
      console.log("Erro ao obter localização.", error);
    }
  );
} else {
  console.log("Navegador não suporta Geolocalização!");
}

$(document).ready(function() {
  initialize();
});
