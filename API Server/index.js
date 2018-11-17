var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
//var neo4j = require('neo4j-driver').v1;

app.use(cors({credentials: true, origin: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({credentials:true, origin: true}))

var login = require('./routes/login.route.js');

app.use('/login', login)

app.use(function(req, res){
  res.send({status:false ,error:'Invalid URL'});
});

//Utilizar la base de datos
var access = require('./database/access.js')
let db = access.db

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
