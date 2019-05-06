var express = require('express');
var fs = require('fs');

var app = express();

var port = 3000;

app.use(require('./controllers/users'));

app.listen(port, function(){
  console.log('Server started at '+ new Date()+', on port ' + port+'!');
});

app.get('/', function(request, response){
  console.log('GET Request- Index');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index');
});

app.get('/incident/:id', function(request,response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('incident');
});

app.get('/save', function(request,response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('incident');
});
