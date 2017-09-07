 // method for initializing the map
 var map;
 var marker;
 var largeInfowindow;

  var locations = [
      {
        "title": "Imperial War Museum",
        "lat" : "51.495831",
        "lng" : "-0.108662",
        "contact" : "+44 20 7416 5000",
        "address" : "Lambeth Rd, London SE1 6HZ, UK",
        "url" : "iwm.org.uk"
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
        "title": "St. Pauls Cathedral",
        "lat" : "51.513845",
        "lng" : "-0.098351",
        "contact" : "+44 330 333 1144",
        "address" : "St. Paul's Churchyard, London EC4M 8AD, UK",
        "url" : "stpauls.co.uk"
      },
      {
        "title": "The British Library",
        "lat" : "51.529972",
        "lng" : "-0.127676",
        "contact" : "+44 330 333 1144",
        "address" : "96 Euston Rd, Kings Cross, London NW1 2DB, UK",
        "url" : "bl.uk"
      },
      {
        "title": "Madame Tussauds London",
        "lat" : "51.522890",
        "lng" : "-0.154967",
        "contact" : "+44 20 7863 8000",
        "address" : "Marylebone Rd, Marylebone, London NW1 5LR, UK",
        "url" : "madametussauds.com"
      },
      {
        "title": "Sadler's Wells Theatre",
        "lat" : "51.529272",
        "lng" : "-0.106325",
        "contact" : "+44 20 7863 8000",
        "address" : "Marylebone Rd, Marylebone, London NW1 5LR, UK",
        "url" : "sadlerswells.com"
      },
      {
        "title": "The British Museum",
        "lat" : "51.519413",
        "lng" : "-0.126957",
        "contact" :  "+44 20 7323 8299",
        "address" : "Great Russell St, Bloomsbury, London WC1B 3DG, UK",
        "url" : "britishmuseum.org"
      }

 ];


function initialize() {

  map = new google.maps.Map(document.getElementById('map'),{
    center: {lat: 51.506200, lng: -0.116392},
    zoom: 13
  });
  
   var largeInfowindow = new google.maps.InfoWindow();
  
  for (var i = 0; i < locations.length; i++) {
    var data = locations[i];
		var loc = new google.maps.LatLng(data.lat,data.lng);
     marker = new google.maps.Marker({
      position : loc,
      map: map
  });
       
      google.maps.event.addListener(marker, 'click', (function(marker,data,largeInfowindow) {
            return function() {
                largeInfowindow.setContent('<div id="WindowContent">'+'<center>'+'<b>'+data.title+'</b>'+
                                           '<br>'+data.contact+'</br>'+data.address+'<br>'+'<a href="http://'+data.url+'">'+
                                           data.url+'</a>'+'</br>'+'</center>'+'</div>');
                largeInfowindow.open(map, marker);
            }
        })(marker,data,largeInfowindow));
    
    marker.setMap(map); 
    locations[i].marker = marker;
      locations[i].largeInfowindow = largeInfowindow;
  }

  var client_ID = 'QRBMUVGW0P52B0QSOR4YB4Y2J4YK2PYEZI4RT0AVOU4BIJP5';
	var client_Secret = 'BQVPDWBUOIGEG3WLOYF5MWP323PVQPZJJMDWTKPGQ2Y0UMJG';

	for (var i = 0; i < locations.length; i++) {
		var foursquareURL = 'https://api.foursquare.com/v2/venues/search?ll='+ locations[i].lat + ',' + locations[i].lng + '&client_id=' +client_ID + '&client_secret=' + client_Secret + '&v=20160118' + '&query=' + locations[i].title;
	}
   $.getJSON(foursquareURL).done(function(data) {
		var results = data.response.venues[0];
		var fs_url = results.url;
		if (typeof fs_url === 'undefined'){
			fs_url = "";
		}
	}).fail(function() {
		alert("There was an error with the Foursquare API call. Please refresh the page and try again to load Foursquare data.");
});

	ko.applyBindings(new ViewModel());
}
																 
function ViewModel() {
	var self = this;
	this.searchPlace = ko.observable("");
	
	self.filteredList = ko.computed(function () {
    var search = self.searchPlace().toLowerCase();
    return ko.utils.arrayFilter(locations, function (loc) {
        if (loc.title.toLowerCase().indexOf(search) >= 0) {
          showMarker(loc);
          return loc;
        }else {
          hideMarker(loc);
        } 
         
    });
  
});

function showMarker(locat) {
  closeInfoWindows();
  for(var i=0; i<locations.length; i++) {
    if(locations[i].title === locat.title) {
      locations[i].marker.setVisible(true);
        map.setCenter(locations[i].marker.getPosition());
    }
  }
}

function hideMarker(locat) {
  closeInfoWindows();
  for(var i=0; i<locations.length; i++) {
    if(locations[i].title === locat.title) {
      locations[i].marker.setVisible(false);       
    }
  }
}  

self.markerPop = function (obj) { 
  var title = obj.title; 
  for (var i in self.filteredList()) { 
    if (locations[i].title === obj.title) {
    var data = locations[i];
    var loc = new google.maps.LatLng(data.lat,data.lng);
     google.maps.event.trigger(locations[i].marker, 'click'); 
     map.panTo(loc);   
   } 
 }

}
function closeInfoWindows() {
  for(var i=0; i<locations.length; i++) {
    locations[i].largeInfowindow.close();
  }
}

function googleError() {
  alert("Sorry Google Map can't be loaded");
}

}
