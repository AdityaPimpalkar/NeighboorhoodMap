var images = ['1.jpg','2.jpg','3.jpg'];
var i=0;
function plusSlides() {
	if (i <= images.length) {
		i++;
   document.getElementById('switch').src =  images[i];
} 
	if(document.getElementById('switch').getAttribute('src') == "undefined") {
  		document.getElementById('switch').src = images[images.length-1];
  		i=2;
  }
}

function minusSlides() {
	if (i <= images.length) {
		i--;
   document.getElementById('switch').src =  images[i];
} 
	if(document.getElementById('switch').getAttribute('src') == "undefined") {
  		document.getElementById('switch').src = images[0];
  		i=0;
  }
}

		
