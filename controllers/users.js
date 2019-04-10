var express = require('express');
var router = express.Router();

router.get('/users/create', function(req,res){

res.status(200);
res.setHeader('Content-Type', 'text/html');
res.render('account');
});

router.get('/users/login', function(req,res){

res.status(200);
res.setHeader('Content-Type', 'text/html');
res.render('account');
});

router.post('/users/:id/create', function(req,res){
var user=0;
res.status(200);
res.setHeader('Content-Type', 'text/html');
res.render('account', user:user);
});
