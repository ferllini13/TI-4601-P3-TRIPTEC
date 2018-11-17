//BASE DE DATOS CENTRALIZADA

var mongoose = require('mongoose');
var mongoDB = "mongodb://localhost:27017/TRIPTEC"; // cambiar por la direccion de la base hosteada
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


module.exports = db; //EXPORTA LA BASE CENTRALZADA

//funciones para conectarse a la base
ConnectDB = function (tipo, modelo, query, callback) {

    //console.log("Tipo: " + tipo +", query: " + query + ", modelo: " + modelo)

    //HACER LOGICA DE DISTRIBUCIÓN
    if (tipo == "find") {
        modelo.find(query, function (err, result) {
            if (err) {
                callback({ status: false, error: 'Error en la lectura', err: -1 })
            } else {
                callback({ status: true, resultado: result })
            }
        })
    }

    else if (tipo == "findOne") {
        modelo.findOne(query, function (err, result) {
            if (err) {
                callback({ status: false, error: 'Error en la lectura', err: -1 })
            } else {
                callback({ status: true, resultado: result })
            }
        })


    }

    else if (tipo == "findById") {
        modelo.findById(query, function (err, result) {
            if (err) {
                callback({ status: false, error: 'Error en la lectura', err: -1 })
            } else {
                callback({ status: true, resultado: result })
            }
        })
    }

    else if (tipo == "save") {
        modelo.save(function (err, guardado) {
            if (err) {
                console.log(err);
                callback({ status: false, error: 'Error en la escritura', err: -1 })
            } else {
                callback({ status: true, guardado: guardado, message: "Guardado correctamente", err: 0 })
            }
        });
    }

    else if (tipo == "findOneAndUpdate") {
        modelo.findOneAndUpdate(query.id, query.set, function (err, updated) {
            if (err) {
                callback({ status: false, error: 'Error en la actualización', err: -1 })
            } else {
                callback({ status: true, message: "Actualizado correctamente", err: 0 })
            }
        })
    }

    else if (tipo == "findOneAndDelete") {
        modelo.findOneAndDelete(query, function (err, deleted) {
            if (err) {
                callback({ status: false, error: 'Error en el borrado', err: -1 })
            } else {
                callback({ status: true, resultado: deleted, message: "Borrado correctamente", err: 0 })
            }
        })
    } else if (tipo == "populate") {
        if (query.cantidad == 1) {

        } else if (query.cantidad == 2) {
            modelo.find(query.id).populate(query.populate.one).populate(query.populate.two).exec(function (err, json) {
                if (err) {
                    callback({ status: false, error: 'Error en el reporte', err: -1 })
                } else {
                    callback({ status: true, resultado: json, message: "Reporte correcto", err: 0 })
                }
            })


        } else if (query.cantidad == 3) {
            modelo.find(query.id).populate(query.populate.one).populate(query.populate.two).populate(query.populate.three).exec(function (err, json) {
                if (err) {
                    callback({ status: false, error: 'Error en el reporte', err: -1 })
                } else {
                    callback({ status: true, resultado: json, message: "Reporte correcto", err: 0 })
                }
            })
        }
    } else if (tipo == "aggregate") {

        if (query.cantidad == 0) {
            modelo.aggregate(query.id).exec(function (err, json) {
                if (err) {
                    callback({ status: false, error: 'Error en el reporte', err: -1 });
                } else {
                    callback({ status: true, resultado: json, message: "Reporte correcto", err: 0 })
                }
            })
        }
        else {
            if (query.tipo == "max") {
                modelo.aggregate(query.id).sort({ count: -1 }).limit(query.cantidad).exec(function (err, json) {
                    if (err) {
                        callback({ status: false, error: 'Error en el reporte', err: -1 });

                    } else {
                        callback({ status: true, resultado: json, message: "Reporte correcto", err: 0 })
                    }
                })
            } else if (query.tipo == "sorted") {
                modelo.aggregate(query.id).sort(query.sort).exec(function (err, json) {
                    if (err) {
                        callback({ status: false, error: 'Error en el reporte', err: -1 });

                    } else {
                        callback({ status: true, resultado: json, message: "Reporte correcto", err: 0 })
                    }
                })
            }
        }

    } else if (tipo == "count") {
        modelo.count(query, function (err, json) {
            if (err) {
                callback({ status: false, error: 'Error en el reporte', err: -1 });
            } else {
                callback({ status: true, resultado: json, message: "Reporte correcto", err: 0 })
            }
        })
    }
    else {
        callback({ status: false, error: 'Operacion aún no soportada', err: -1 })
    }


}

module.exports.ConnectDB = ConnectDB
//AggregateDB = function(aggregate, model, callback){};