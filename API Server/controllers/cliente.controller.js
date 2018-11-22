var ConnectDB = require('../database/access.js').ConnectDB;
var ConnectNEO4J_DB = require('../database/accessNEO4j.js').ConnectNEO4J_DB;
const Cliente = require('../models/cliente.model');
const Reservacion = require('../models/reservacion.model');

//reserva un lugar
exports.book = function(req, res){
    let reservacion = new Reservacion({
        idClient: req.body.idClient,
        name: req.body.name,
        clientsAmount: req.body.clientsAmount,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        needs: req.body.needs,
        additionals: req.body.additionals
    });
    var tipo = "save"
    modelo = reservacion;
    var query = {};
    ConnectDB(tipo, modelo, query, function (json){
        if (json.status == true){
            var tipo2 = "reservar"
            ConnectNEO4J_DB(tipo2, reservacion, null);
            res.send(json);
        }else{
            res.send(json);
        }
    });    
    
}

//muestra el historial de reservaciones de un cliente

//FIX: se debe agregar el monto total.
exports.history = function(req, res){
    var tipo = "find";
    var modelo = Reservacion;
    var query = {idClient: req.params.id};
    ConnectDB(tipo, modelo, query, function (json){
        res.send(json);
    });
}

//obtiene el cliente por la cedula
exports.readById = function(req, res){
    var tipo = "findOne";
    var modelo = Cliente;
    var query = {id: req.params.id};
    ConnectDB(tipo, modelo, query, function (json){
        res.send(json);
    });    
}

//agrega un sitio posible a visitar
exports.possibleVisit = function(req, res){
    var tipo = "findOne";
    var modelo = Reservacion;
    var query = {idClient: req.params.id, name: req.params.name};
    ConnectDB(tipo, modelo, query, function (json){
        if (json.status == true && json.resultado != null){
            let sitio = {name: req.body.name, radio: req.body.radio};
            json.resultado.possibleVisit.push(sitio);
            tipo = "findOneAndUpdate";
            var list = json.resultado.possibleVisit;
            var constraint = {idClient: req.params.id, name: req.params.name};
            query = {id: constraint, set: {possibleVisit: list}};
            ConnectDB(tipo, modelo, query, function (json){
                res.send(json)
            });
        }else{
            res.send(json);
        }
    });
}

//obtiene el wish list de un cliente
exports.wishlist = function(req, res){
    var tipo = "findOne";
    var modelo = Cliente;
    var query = {id: req.params.id};
    ConnectDB(tipo, modelo, query, function (json){
         if (json.status == true && json.resultado != null){
            var result = {status: true, resultado: json.resultado.wishlist}
            res.send(result);
         }else{
            res.send(json);
         }
    });
}

//agregar al wishlist
exports.wish = function(req, res){
    var tipo = "findOne";
    var modelo = Cliente;
    var query = {id: req.params.id};
    ConnectDB(tipo, modelo, query, function (json){
        if (json.status == true && json.resultado != null){
            var name = req.params.name;
            json.resultado.wishlist.push(name);
            tipo = "findOneAndUpdate";
            var list = json.resultado.wishlist;
            var constraint = {id: req.params.id};
            query = {id: constraint, set: {wishlist: list}};
            ConnectDB(tipo, modelo, query, function (json){
                res.send(json)
            });
        }else{
            res.send(json);
        }
    });
}
