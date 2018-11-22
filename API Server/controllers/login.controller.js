const Usuario = require('../models/usuario.model');
const Cliente = require('../models/cliente.model');
var ConnectDB = require('../database/access.js').ConnectDB;
var ConnectNEO4J_DB = require('../database/accessNEO4j.js').ConnectNEO4J_DB;

//busca el usuario especificado para login
exports.login = function (req, res) {
    var tipo = "findOne"
    var query = { user: req.body.user, password: req.body.password };
    var modelo = Usuario;
    ConnectDB(tipo, modelo, query, function (json) {        
        console.log(json.status)
        if (json.status == true && json.resultado != null){
            if (json.resultado.type == 0){
                modelo = Cliente;
                query = {id: json.resultado.id};
                ConnectDB(tipo, modelo, query, function(jsonCliente){
                    let result = {
                        id: json.resultado.id,
                        name: jsonCliente.resultado.name,
                        correo: jsonCliente.resultado.correo,
                        phone: jsonCliente.resultado.phone,
                        birth: jsonCliente.resultado.birth,
                        user: json.resultado.user,
                        type: json.resultado.type
                    }
                    res.send({status:true, resultado: result});
                })
            }else{
                res.send(json);
            }
        }else{
            res.send(json);
        }
    });
}


//registra un usuario o un admin
exports.register = function (req, res) {
    var tipo = "save"
    var query = {};
    let usuario = new Usuario({
        id: req.body.id,
        type: req.body.type,
        user: req.body.user,
        password: req.body.password
    });
    var modelo = usuario;
    ConnectDB(tipo, modelo, query, function (json) {
        if (json.status == true && req.body.type == 0){
            let cliente = new Cliente({
                id :req.body.id,
                name : req.body.name,
                correo : req.body.correo,
                phone : req.body.phone,
                birth : req.body.birth
            });
            modelo = cliente;     
            ConnectDB(tipo, modelo, query, function (json) {
                if (json.status == true){
                    var tipo2 = "crearCliente";
                    ConnectNEO4J_DB(tipo2, cliente, null);
                    res.send(json);
                }else{
                    res.send(json);
                }
            });
        }else{
            res.send(json);
        }
    })
}
