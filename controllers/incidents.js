var express = require('express');
var app = express.Router();

var global_incident_type;

app.get('/incident/:id/shooting/', function(request,response){
  console.log('GET Request- Shooting Incident');
  var user={
    "email": request.params.id,
  }
  global_incident_type=0;
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('incident', {incident_type: 0, save_feedback: 0, user});
});

app.get('/incident/:id/arrest', function(request,response){
  console.log('GET Request- Arrest Incident');
  var user={
    "email": request.params.id,
  }
  global_incident_type=1;
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('incident', {incident_type: 1, save_feedback: 0, user});
});

app.get('/incident/save', function(request,response){
  console.log('GET Request- SAVE Incident');
  //SAVE INFO ON SHEETS, NO NEED TO REDIRECT
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('incident', {incident_type: global_incident_type, save_feedback: 1});
});

module.exports = app;
