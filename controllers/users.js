var express = require('express');
var router = express.Router();
var auth = require('../models/auth');
var active_account="hey2";

router.get('/users/create', function(req,res){
  console.log("GET Request: /users/create");
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.render('account', {input_type:0, feedback:0});
});

router.get('/users/login', function(req,res){
  console.log("GET Request: /users/login");
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.render('account', {input_type:1, feedback:0});
});

router.post('/users/create/redirect', function(req,res){
  console.log("POST Request: /users/:id/create");
  var user = {
    "email": req.body.email,
    "password": req.body.password,
  };
  console.log("USER INPUT: "+user.email+", "+user.password)
  if(user.email==""||user.password==""){
    console.log("INPUT ERROR")
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render('account', {input_type: 0, feedback:-1});//finish feedback
  }
  else{
    console.log("New user: "+user.email);
    //add user to database
    active_account=user.email;
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render('index', {user, coord_feedback: 0});
  }
});

router.post('/users/login/redirect', function(req,res){
  console.log("POST Request: /users/:id/login");
  var user = {
    "email": req.body.email,
    "password": req.body.password,
  };
  console.log("USER INPUT: "+user.email+", "+user.password)
  if(user.email==""||user.password==""){
    console.log("INPUT ERROR")
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render('account', {input_type: 1, feedback:-1});//finish feedback
  }
  //checking if user exists
  else{
      auth.authUser(user,function(return){
     if(return == true){
      console.log("User log in successful: "+user.email);
      active_account=user.email;
      res.status(200);
      res.setHeader('Content-Type', 'text/html');
      res.render('index', {user, coord_feedback: 0});
    }
    else{
      console.log("User log in unsuccessful: "+user.email);
      //unsuccessful login respond appropriately
    }
  });
}

});

router.get('/users/logout', function(req,res){
  console.log("User log out successful.");
  var user={
    "email": "null"
  }
  active_account="hey3";
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.render('index', {user, coord_feedback: 0});
});

module.exports = router;
// module.exports = active_account;
