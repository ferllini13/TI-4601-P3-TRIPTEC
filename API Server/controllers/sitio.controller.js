var ConnectDB = require('../database/access.js').ConnectDB;
var ConnectNEO4J_DB = require('../database/accessNEO4j').ConnectNEO4J_DB;

const Sitio = require('../models/sitio.model.js');

//registra un lugar nuevo
exports.register = function (req, res) {
    let sitio = new Sitio({
        name :req.body.name,
        direction : req.body.direction,
        long : req.body.long,
        lat : req.body.lat,
        description : req.body.description,
        activities : req.body.activities,
        price : req.body.price,
        type : req.body.type,
        image : req.body.image,
        rating : req.body.rating,
        cellphone : req.body.cellphone,
        schedule : req.body.schedule,
        website : req.body.website
    });

    var tipo = "save"
    var query = {}
    var modelo = sitio
    ConnectDB(tipo, modelo, query, function (json){
        if (json.status == true){
            var tipo2 = "crearSitio";
            ConnectNEO4J_DB(tipo2, sitio, null);
            res.send(json);
        }else{
            res.send(json);
        }
    });
}

//obtiene el lugar por el nombre
exports.read = function(req, res){
    var tipo = "findOne";
    var query = {name: req.params.name};
    var modelo = Sitio;
    ConnectDB(tipo, modelo, query, function(json){
        res.send(json)
    })
}

//obtiene todos los lugares
exports.readAll = function(req, res){
    var tipo = "find";
    var query = {};
    var modelo = Sitio;
    ConnectDB(tipo, modelo, query, function(json){
        res.send(json)
    })
}