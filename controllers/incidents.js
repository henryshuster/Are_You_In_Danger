var express = require('express');
var app = express.Router();

var global_incident_type;
var Auth = require('../models/auth');
var Shootings = require('../models/shooting');
var Arrests = require('../models/arrest');
var latest_incident;


app.post('/incident/:id/find_incident', function(request,response){
  console.log('POST Request- Shooting Incident');
  var user={
    "email": request.params.id,
    "longitude": request.body.longitude,
    "latitude": request.body.latitude
  }
  var incident_found;
  // console.log(user);
  if(request.body.longitude==""){
    console.log('ERROR- Coordinates not selected');
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('index', {user, coord_feedback: -1});
  }
  else{
    Shootings.getClosestShooting(user.latitude, user.longitude, function(incident){
      incident_found = incident;
      if(incident_found.incidentkey!=""){
        console.log("SHOOTING FOUND: "+JSON.stringify(incident_found));
        global_incident_type=0;
        latest_incident=incident_found;
        response.status(200);
        response.setHeader('Content-Type', 'text/html')
        response.render('incident', {incident_type: 0, save_feedback: 0, user, incident_found});
      }
      else{
        Arrests.getClosestArrest(user.latitude, user.longitude, function(incident2){
          incident_found = incident2;
          if(incident_found.incidentkey!=""){
            console.log("ARREST FOUND: "+JSON.stringify(incident_found));
            global_incident_type=1;
            latest_incident=incident_found;
            response.status(200);
            response.setHeader('Content-Type', 'text/html')
            response.render('incident', {incident_type: 1, save_feedback: 0, user, incident_found});
          }
          else{
            console.log('ERROR- Could not find nearest incident.');
            latest_incident=incident_found;
            response.status(200);
            response.setHeader('Content-Type', 'text/html')
            response.render('index', {user, coord_feedback: -2});
          }

        });
      }
    });
  }
});
app.get('/incident/:id/:longitude/:latitude/save', function(request,response){
  console.log('GET Request- Save Incident');
  var user={
    "email": request.params.id,
    "longitude": request.params.longitude,
    "latitude": request.params.latitude,
    "datasave": JSON.stringify(latest_incident)

  }
  var incident_found=latest_incident;

  //save the incident found to database
  Auth.updateUser(user,incident_found,function(){
  console.log("INCIDENT: "+JSON.stringify(incident_found));
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('incident', {user, incident_found, incident_type: global_incident_type, save_feedback: 1});
});
});

module.exports = app;
