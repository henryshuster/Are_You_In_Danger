// // API Key for Mapbox. Get one here:
// // https://www.mapbox.com/studio/account/tokens/
// const key = 'pk.eyJ1IjoidHlsZXJtYXN1eWFtYTE5IiwiYSI6ImNqdmgxZGVyeDBkcms0OGxnY3VieTk2YjYifQ.lIjX9BjGk4q84u6UTcp7SQ'
//
// // Options for map
// const options = {
//   lat: 0,
//   lng: 0,
//   zoom: 4,
//   studio: true, // false to use non studio styles
//   //style: 'mapbox.dark' //streets, outdoors, light, dark, satellite (for nonstudio)
//   style: 'mapbox://styles/mapbox/traffic-night-v2',
// };
//
// // Create an instance of Mapbox
// const mappa = new Mappa('Mapbox', key);
// let myMap;
//
// let canvas;
// let meteorites;
//
// function setup() {
//   canvas = createCanvas(800, 700);
//
//   // Create a tile map and overlay the canvas on top.
//   myMap = mappa.tileMap(options);
//   myMap.overlay(canvas);
//
//   // Load the data
//   meteorites = loadTable('../../data/Meteorite_Landings.csv', 'csv', 'header');
//
//   // Only redraw the meteorites when the map change and not every frame.
//   myMap.onChange(drawMeteorites);
//
//   fill(109, 255, 0);
//   stroke(100);
// }
//
// // The draw loop is fully functional but we are not using it for now.
// function draw() {}
//
// function drawMeteorites() {
//   // Clear the canvas
//   clear();
//
//   for (let i = 0; i < meteorites.getRowCount(); i += 1) {
//     // Get the lat/lng of each meteorite
//     const latitude = Number(meteorites.getString(i, 'reclat'));
//     const longitude = Number(meteorites.getString(i, 'reclong'));
//
//     // Only draw them if the position is inside the current map bounds. We use a
//     // Mapbox method to check if the lat and lng are contain inside the current
//     // map. This way we draw just what we are going to see and not everything. See
//     // getBounds() in https://www.mapbox.com/mapbox.js/api/v3.1.1/l-latlngbounds/
//     if (myMap.map.getBounds().contains([latitude, longitude])) {
//       // Transform lat/lng to pixel position
//       const pos = myMap.latLngToPixel(latitude, longitude);
//       // Get the size of the meteorite and map it. 60000000 is the mass of the largest
//       // meteorite (https://en.wikipedia.org/wiki/Hoba_meteorite)
//       let size = meteorites.getString(i, 'mass (g)');
//       size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
//       ellipse(pos.x, pos.y, size, size);
//     }
//   }
// }



var img;
var x = -200;
var startX = 0;
var y = -200;
var startY = 0;

const key = 'AIzaSyBrhDK19qy0m3Vfg7CGPwF47c5RgmbmcA0';
const options = {
  lat: 40.7128,
  lng: -74.0060,
  zoom: 10.25,
};
const mappa = new Mappa('Google', key);
let myMap;
let meteorites;

var selectPoint=true;

let canvas;
var geoJSON;

function setup() {
  canvas = createCanvas(windowWidth, 500);

  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');

  // document.getElementById("searchbc").addEventListener("click",search);

  //mappa==============
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);


  // Load the data
  meteorites = loadTable('data/Meteorite_Landings.csv', 'csv', 'header');

  // Only redraw the meteorites when the map change and not every frame.
  // myMap.onChange(drawMeteorites);
  // myMap.onChange(drawPoint);
  // initMap()

  fill(207, 204, 0);
  noStroke();
  //======================


  //background(230);
}

//
// function initMap() {
//   geoJSON = new google.maps.Map(document.getElementById('map'), {
//     zoom: 4,
//     center: {lat: -28, lng: 137}
//   });
//   console.log("geoJSON")
//   // NOTE: This uses cross-domain XHR, and may not work on older browsers.
//   geoJSON.data.loadGeoJson('data/NYPD Sector.geojson');
// }

function drawPoint(){
  clear();
  console.log("nigeria")
  const nigeria = myMap.latLngToPixel(11.396396, 5.076543);
  ellipse(nigeria.x, nigeria.y, 50, 50);
}

function search(){
  var input = document.getElementById("searchterm").value;
  document.getElementById("searchterm").value="";
  console.log(input);
  myMap.setOptions({draggable: false});
}

function windowResized() {
  /*canvas = createCanvas(windowWidth, 500);

    // Move the canvas so it’s inside our <div id="sketch-holder">.
    canvas.parent('sketch-holder');


//mappa==============
myMap.overlay(canvas);

myMap.checkResize();*/

}
//
// function draw() {
//   background(230);
//   ellipse(50, 50, 80, 80);
//   image(img, x, y, 1416, 1206);
//   if(mouseX<width&&mouseX>0&&mouseY>0&&mouseY<height){
//     if(selectPoint){
//       document.body.style.cursor="default";
//     //console.log("hello");
//   }
//   }
//   else{
//     document.body.style.cursor="grab";
//   }
//
//
// }

function mousePressed() {
  startX = mouseX;
  startY = mouseY;
  console.log(mouseX+", "+mouseY);
}

function mouseDragged() {
var diff = startX - mouseX;
  x = x - diff;
  startX = mouseX;
  diff = startY - mouseY;
  y = y - diff;
  startY = mouseY;
}
// Draw the meteorites
function drawMeteorites() {
  // Clear the canvas
  clear();

  for (let i = 0; i < meteorites.getRowCount(); i++) {
    // Get the lat/lng of each meteorite
    const latitude = Number(meteorites.getString(i, 'reclat'));
    const longitude = Number(meteorites.getString(i, 'reclong'));

    // Only draw them if the position is inside the current map bounds. We use a
    // Leaflet method to check if the lat and lng are contain inside the current
    // map. This way we draw just what we are going to see and not everything. See
    // getBounds() in http://leafletjs.com/reference-1.1.0.html
    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
      // Transform lat/lng to pixel position
      const pos = myMap.latLngToPixel(latitude, longitude);
      // Get the size of the meteorite and map it. 60000000 is the mass of the largest
      // meteorite (https://en.wikipedia.org/wiki/Hoba_meteorite)
      let size = meteorites.getString(i, 'mass (g)');
      size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
      ellipse(pos.x, pos.y, size, size);
    }
  }
}








//
// /* -----------
// Mapbox Demo demo.
// Visualizing 45,716 Meteorite Landings.
// Data from NASA's Open Data Portal.(https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh)
// ----------- */
//
// // API Key for Mapbox. Get one here:
// // https://www.mapbox.com/studio/account/tokens/
// const key = 'pk.eyJ1IjoibWFwcGF1c2VyIiwiYSI6ImNqNXNrbXIyZDE2a2cyd3J4Ym53YWxieXgifQ.JENDJqKE1SLISxL3Q_T22w'
//
// // Options for map
// const options = {
//   lat: 0,
//   lng: 0,
//   zoom: 4,
//   studio: true, // false to use non studio styles
//   //style: 'mapbox.dark' //streets, outdoors, light, dark, satellite (for nonstudio)
//   style: 'mapbox://styles/mapbox/traffic-night-v2',
// };
//
// // Create an instance of Mapbox
// const mappa = new Mappa('Mapbox', key);
// let myMap;
//
// let canvas;
// let meteorites;
//
// function setup() {
//   canvas = createCanvas(640, 580).parent('canvasContainer');
//
//   // Create a tile map and overlay the canvas on top.
//   myMap = mappa.tileMap(options);
//   myMap.overlay(canvas);
//
//   // Load the data
//   meteorites = loadTable('../../data/Meteorite_Landings.csv', 'csv', 'header');
//
//   // Only redraw the meteorites when the map change and not every frame.
//   myMap.onChange(drawMeteorites);
//
//   fill(109, 255, 0);
//   stroke(100);
// }
//
// // The draw loop is fully functional but we are not using it for now.
// function draw() {}
//
// function drawMeteorites() {
//   // Clear the canvas
//   clear();
//
//   for (let i = 0; i < meteorites.getRowCount(); i += 1) {
//     // Get the lat/lng of each meteorite
//     const latitude = Number(meteorites.getString(i, 'reclat'));
//     const longitude = Number(meteorites.getString(i, 'reclong'));
//
//     // Only draw them if the position is inside the current map bounds. We use a
//     // Mapbox method to check if the lat and lng are contain inside the current
//     // map. This way we draw just what we are going to see and not everything. See
//     // getBounds() in https://www.mapbox.com/mapbox.js/api/v3.1.1/l-latlngbounds/
//     if (myMap.map.getBounds().contains([latitude, longitude])) {
//       // Transform lat/lng to pixel position
//       const pos = myMap.latLngToPixel(latitude, longitude);
//       // Get the size of the meteorite and map it. 60000000 is the mass of the largest
//       // meteorite (https://en.wikipedia.org/wiki/Hoba_meteorite)
//       let size = meteorites.getString(i, 'mass (g)');
//       size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
//       ellipse(pos.x, pos.y, size, size);
//     }
//   }
// }
