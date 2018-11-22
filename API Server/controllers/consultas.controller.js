const Usuario = require('../models/usuario.model');
const Cliente = require('../models/cliente.model');
var ConnectDB = require('../database/access.js').ConnectDB;
var ConnectNEO4J_DB = require('../database/accessNEO4j.js').ConnectNEO4J_DB;

exports.sitiosCliente = function(req, res){
    var tipo = "sitios cliente";
    var objeto = {id: req.params.id};
    ConnectNEO4J_DB(tipo, objeto, function(json){
        res.send(json);

    });
}

exports.sitiosReservados = function(req, res){
    var tipo = "sitios reservados";
    var objeto = {};
    ConnectNEO4J_DB(tipo, objeto, function(json){
        res.send(json);

    });
}

exports.sitiosMasReservados = function(req, res){
    var tipo = "sitios mas reservados";
    var objeto = {};
    ConnectNEO4J_DB(tipo, objeto, function(json){
        res.send(json);

    });
}

exports.sitiosEnComun = function(req, res){
    var tipo = "sitios en comun";
    var objeto = {id: req.params.id};
    ConnectNEO4J_DB(tipo, objeto, function(json){
        res.send(json);

    });
}
