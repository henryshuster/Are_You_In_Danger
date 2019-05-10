var express = require('express');
var app = express.Router();

app.get('/incident/shooting/:id', function(request,response){
  console.log('GET Request- Shooting Incident');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('incident', {incident_type: 0, save_feedback: 0});
});

app.get('/incident/arrest/:id', function(request,response){
  console.log('GET Request- Arrest Incident');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('incident', {incident_type: 1, save_feedback: 0});
});

app.get('/incident/save', function(request,response){
  console.log('GET Request- SAVE Incident');
  //SAVE INFO ON SHEETS, NO NEED TO REDIRECT
  // response.status(200);
  // response.setHeader('Content-Type', 'text/html')
  // response.render('incident', {incident_type: 0, save_feedback: 1});
});

module.exports = app;
