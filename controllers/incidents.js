var express = require('express');
var app = express.Router();

var global_incident_type;

app.post('/incident/:id/shooting', function(request,response){
  console.log('POST Request- Shooting Incident');
  var user={
    "email": request.params.id,
    "longitude": request.body.longitude,
    "latitude": request.body.latitude
  }
  // console.log(user);
  if(request.body.longitude==""){
    console.log('ERROR- Coordinates not selected');
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('index', {user, coord_feedback: -1});
  }
  else{
    global_incident_type=1;
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('incident', {incident_type: 0, save_feedback: 0, user});
  }
});

app.post('/incident/:id/arrest', function(request,response){
  console.log('POST Request- Arrest Incident');
  var user={
    "email": request.params.id,
    "longitude": request.body.longitude,
    "latitude": request.body.latitude
  }
  global_incident_type=1;
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('incident', {incident_type: 1, save_feedback: 0, user});
});

app.get('/incident/:id/:longitude/:latitude/save', function(request,response){
  console.log('GET Request- Save Incident');
  var user={
    "email": request.params.id,
    "longitude": request.params.longitude,
    "latitude": request.params.latitude
  }
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('incident', {user, incident_type: global_incident_type, save_feedback: 1});
});

module.exports = app;
