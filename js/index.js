 // method for initializing the map
 var map;
 var marker;
 var largeInfowindow;
 var markers = [];

 function initialize() {

     map = new google.maps.Map(document.getElementById('map'), {
         center: {
             lat: 51.506200,
             lng: -0.116392
         },
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
         var loc = new google.maps.LatLng(locations[i].lat, locations[i].lng);
         marker = new google.maps.Marker({
             position: loc,
             map: map,
             animation: google.maps.Animation.DROP,
             id: locations[i].id,
             name: locations[i].title
         });
         markers.push(marker);

         google.maps.event.addListener(marker, 'click', infoWindowContent(marker, data, largeInfowindow));

         locations[i].marker = marker;
         locations[i].largeInfowindow = largeInfowindow;
         marker.setMap(map);
     }

     function infoWindowContent(marker, data, largeInfowindow) {
         var venueFoursquareID = marker.id;
         return function() {
             foursquareURL = apiURL + venueFoursquareID + '?client_id=' + client_ID + '&client_secret=' + client_Secret + '&v=20160118';

             $.getJSON(foursquareURL).done(function(data) {
                 fsName = data.response.venue.name;
                 if (typeof fsName === "undefined") {
                    fsName='';
                 }
                 fsContact = data.response.venue.contact.formattedPhone;
                 if (typeof fsContact === "undefined") {
                    fsContact='';
                 }
                 fsAddress = data.response.venue.location.formattedAddress;
                 if (typeof fsAddress === "undefined") {
                    fsAddress='';
                 }
                 fsUrl = data.response.venue.url;
                 if (typeof fsUrl === "undefined") {
                    fsUrl='';
                 }
                 largeInfowindow.setContent('<div id="WindowContent">' + '<center>' + '<b>' + fsName + '</b>' +
                     '<br>' + fsContact + '</br>' + fsAddress + '<br>' + '<a href="http://' + fsUrl + '">' +
                     fsUrl + '</a>' + '</br>' + '</center>' + '</div>');
                 largeInfowindow.open(map, marker);
                 marker.setAnimation(google.maps.Animation.BOUNCE);
                 setTimeout(function() {
                     marker.setAnimation(null);
                 }, 2100);
             }).fail(function() {
                 alert("There was an error with the Foursquare API call. Please refresh the page and try again to load Foursquare data.");
             });

         };
     }

     ko.applyBindings(new ViewModel());
 }

 function ViewModel() {
     var self = this;
     this.searchPlace = ko.observable("");

     self.filteredList = ko.computed(function() {
         var search = self.searchPlace().toLowerCase();
         return ko.utils.arrayFilter(locations, function(loc) {
             if (loc.title.toLowerCase().indexOf(search) >= 0) {
                 showMarker(loc);
                 return loc;
             } else {
                 hideMarker(loc);
             }

         });

     });

     function showMarker(locat) {
         closeInfoWindows();
         for (var i = 0; i < locations.length; i++) {
             if (locations[i].title === locat.title) {
                 locations[i].marker.setVisible(true);
                 map.setCenter(locations[i].marker.getPosition());
             }
         }
     }

     function hideMarker(locat) {
         closeInfoWindows();
         for (var i = 0; i < locations.length; i++) {
             if (locations[i].title === locat.title) {
                 locations[i].marker.setVisible(false);
             }
         }
     }

     self.markerPop = function(obj) {
         var title = obj.title;
         for (var i = 0; i < locations.length; i++) {
             if (locations[i].title === obj.title) {
                 var data = locations[i];
                 var loc = new google.maps.LatLng(data.lat, data.lng);
                 google.maps.event.trigger(locations[i].marker, 'click');
                 map.panTo(loc);
             }
         }
     };

     function closeInfoWindows() {
         for (var i = 0; i < locations.length; i++) {
             locations[i].largeInfowindow.close();
         }
     }

 }

 function googleError() {
     alert("Sorry Google Map can't be loaded");
 }
