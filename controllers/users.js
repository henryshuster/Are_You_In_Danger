var express = require('express');
var router = express.Router();

router.get('/users/create', function(req,res){

res.status(200);
res.setHeader('Content-Type', 'text/html');
res.render('account', {input_type:0, feedback:0});
});

router.get('/users/login', function(req,res){

res.status(200);
res.setHeader('Content-Type', 'text/html');
res.render('account', {input_type:1, feedback:0});
});

router.post('/users/:id/create', function(req,res){
var user=0;
res.status(200);
res.setHeader('Content-Type', 'text/html');
res.render('account');
});

router.get('/users/:id/login', function(req,res){

res.status(200);
res.setHeader('Content-Type', 'text/html');
res.render('index');
});

router.get('/users/logout', function(req,res){

res.status(200);
res.setHeader('Content-Type', 'text/html');
res.render('account');
});

module.exports = router;
