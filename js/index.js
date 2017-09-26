 // method for initializing the map
 var map;
 var marker;
 var largeInfowindow;
 var markers = [];

  var locations = [
      {
        "title": "St. Pauls Cathedral",
        "lat" : "51.513845",
        "lng" : "-0.098351",
        "id" : "4ac518cef964a520f5a520e3"      
      },
      {
        "title": "British Library",
        "lat" : "51.529972",
        "lng" : "-0.127676",
        "id" : "4ac518cef964a52019a620e3"        
      },
      {
        "title": "Imperial War Museum",
        "lat" : "51.495831",
        "lng" : "-0.108662",
        "id" : "4ac518d3f964a52078a720e3"
                
      },
      {
        "title": "Madame Tussauds",
        "lat" : "51.522890",
        "lng" : "-0.154967",
        "id" : "4ac518cef964a520fca520e3"
      },
      {

        "title": "British Museum",
        "lat" : "51.519413",
        "lng" : "-0.126957",
        "id" : "4ac518d2f964a5203da720e3" 
             
      },
      {   
        "title": "Sadler's Wells",
        "lat" : "51.529272",
        "lng" : "-0.106325",
        "id" : "4ac518e8f964a52077ab20e3"        
      },
      {
        "title": "Buckingham Palace",
        "lat" : "51.501364",
        "lng" : "-0.141890",
        "id" : "4abe4502f964a520558c20e3"
      }

 ];


function initialize() {

  map = new google.maps.Map(document.getElementById('map'),{
    center: {lat: 51.506200, lng: -0.116392},
    zoom: 13
  });
  
   var largeInfowindow = new google.maps.InfoWindow();
   var apiURL = 'https://api.foursquare.com/v2/venues/';
  var data;
  var fsName;
  var fsContact;
  var fsAddress;
  var fsUrl;
  var client_ID = 'QRBMUVGW0P52B0QSOR4YB4Y2J4YK2PYEZI4RT0AVOU4BIJP5';
  var client_Secret = 'BQVPDWBUOIGEG3WLOYF5MWP323PVQPZJJMDWTKPGQ2Y0UMJG';

  for (var i = 0; i < locations.length; i++) {
    data = locations[i];
	var loc = new google.maps.LatLng(locations[i].lat,locations[i].lng);
     	marker = new google.maps.Marker({
      	position : loc,
      	map: map,	
	animation: google.maps.Animation.DROP,
      	id: locations[i].id,
      	name: locations[i].title
  });
     markers.push(marker);
     google.maps.event.addListener(marker, 'click', infoWindowContent(marker,data,largeInfowindow));

    locations[i].marker = marker;
      locations[i].largeInfowindow = largeInfowindow;
      marker.setMap(map);
  }  

  function infoWindowContent(marker,data,largeInfowindow) {
    var venueFoursquareID = marker.id;
    return function() {
      foursquareURL = apiURL + venueFoursquareID + '?client_id=' +client_ID + '&client_secret=' + client_Secret + '&v=20160118';

      $.getJSON(foursquareURL).done(function(data) {
        fsName = data.response.venue.name;
        fsContact = data.response.venue.contact.formattedPhone;
        fsAddress = data.response.venue.location.formattedAddress;
        fsUrl = data.response.venue.url;
        largeInfowindow.setContent('<div id="WindowContent">'+'<center>'+'<b>'+fsName+'</b>'+
                                           '<br>'+fsContact+'</br>'+fsAddress+'<br>'+'<a href="http://'+fsUrl+'">'+
                                           fsUrl+'</a>'+'</br>'+'</center>'+'</div>');
        largeInfowindow.open(map, marker);
	marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
          marker.setAnimation(null);
      }, 2100);        
      }).fail(function() {
        alert("There was an error with the Foursquare API call. Please refresh the page and try again to load Foursquare data.");
      });

    }
}
  
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
  for (var i=0;i<locations.length;i++) { 
    if (locations[i].title === obj.title) {
    var data = locations[i];
    var loc = new google.maps.LatLng(data.lat,data.lng);
     google.maps.event.trigger(locations[i].marker, 'click'); 
     map.panTo(loc);   
   } 
  }
};

function closeInfoWindows() {
  for(var i=0; i<locations.length; i++) {
    locations[i].largeInfowindow.close();
  }
}

function googleError() {
  alert("Sorry Google Map can't be loaded");
}

}
