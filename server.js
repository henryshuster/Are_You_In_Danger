var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');

var app = express();

var port = 3000;

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());

app.use(require('./controllers/users'));
app.use(require('./controllers/incidents'));
// app.use(favicon(__dirname + '/public/images/warning_logo.jpg'));

app.listen(port, function(){
  console.log('Server started at '+ new Date()+', on port ' + port+'!');
});

app.get('/', function(request, response){
  console.log('GET Request- Index');
  var user = {
    "email":"null",
  };
  console.log(user.email);
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index', {user, coord_feedback: 0});
});

app.get('/home/:id', function(request, response){
  console.log('GET Request- /home');
  console.log(request.params)
  var user= {
    "email":request.params.id,
  }
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index', {user, coord_feedback: 0});
});
