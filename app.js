 // method for initializing the map
 var map;
 var markers;
 var infowindow;

function initialize() {

   var locations = [
      {
        "title": "The British Museum",
        "lat" : "51.519413",
        "lng" : "-0.126957",
        "contact" :  "+44 20 7323 8299",
        "address" : "Great Russell St, Bloomsbury, London WC1B 3DG, UK",
        "url" : "britishmuseum.org"
      },
      {
        "title": "Buckingham Palace",
        "lat" : "51.501364",
        "lng" : "-0.141890",
        "contact" : "+44 303 123 7300",
        "address" : "Westminster, London SW1A 1AA, UK",
        "url" : "royalcollection.org.uk"
      },
      {
        "title": "The British Library",
        "lat" : "51.529972",
        "lng" : "-0.127676",
        "contact" : "+44 330 333 1144",
        "address" : "Westminster, London SW1A 1AA, UK",
        "url" : "royalcollection.org.uk"
      }
 ];


  map = new google.maps.Map(document.getElementById('map'),{
    center: {lat: 51.507351, lng: -0.127758},
    zoom: 13
  });
   
  for (var i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
      position : new google.maps.LatLng(locations[i].lat,locations[i].lng),
      map: map
  });
      var largeInfowindow = new google.maps.InfoWindow({
        content: '<div id="WindowContent">'+locations[i].title+'</div>'
      });
      marker.addListener('click',function(){
          largeInfowindow.open(marker,map);
      });
      marker.setMap(map); 
     
}


}