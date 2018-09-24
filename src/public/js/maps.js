
var neighborhoods = [

];

var markers = [];
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: { lat: 17.0654200, lng: -96.7236500 }
  });
}
drop();
function drop() {
  clearMarkers();
  for (var i = 0; i < neighborhoods.length; i++) {
    addMarkerWithTimeout(neighborhoods[i], i * 200);
  }
}


function addMarkerWithTimeout(position, timeout) {
  window.setTimeout(function () {
    var contentString = '<div id="content">' +
      '<h3 id="firstHeading" class="firstHeading">' + position.nombre + '</h3>' +
      '<div id="bodyContent">' +
      '<p> estatus :'+position.estatus+'</p>'+
      '<p> direccion  :'+position.calle +' codigo postal : '+position.cp+'</p>'+
    '</div>' +
      '</div>';

    var marker = new google.maps.Marker({
      position: position,
      map: map,
      animation: google.maps.Animation.DROP,
      icon: {
        url: position.color
      }
    });
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    marker.addListener('click', function () {
      infowindow.open(map, marker);
    });
    markers.push(marker);

  }, timeout);


}

function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

