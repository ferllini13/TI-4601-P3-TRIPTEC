const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

let reservacionSchema = new Schema({
    idClient : {type: String, required: true,  min: 9, max:9},
    name: {type: String, required: true},
    clientsAmount : {type: Number, required: true},
    checkIn: {type: Date, required: true},
    checkOut: {type: Date, required: true},
    needs: {type: [String], required: false},
    additionals: {type: [String], required: false},
    possibleVisit: 
        [{
            name: {type: String, required: true},
            radio: {type: Number, required: true}
        }]

});

//Exporta el modelo
module.exports = mongoose.model('Reservacion', reservacionSchema);