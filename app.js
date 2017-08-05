 // method for initializing the map
 var map;
 var marker;
 var infowindow;
function initialize() {
  map = new google.maps.Map(document.getElementById('map'),{
    center: {lat: 19.2183307, lng: 72.97808970000006},
    zoom: 13
  });

google.maps.event.addListener(map, 'click', function(event) {
   PlaceMarker(event.latLng,map);
});

  function PlaceMarker(location,map) {
  marker = new google.maps.Marker({
  position : location,
  map: map
  });
   
}
infowindow = new google.maps.InfoWindow({
    content : '<p>LatLng'+ marker.getPosition() +'</p>'
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });

}
