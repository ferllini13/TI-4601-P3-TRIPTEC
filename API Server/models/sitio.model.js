const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

let sitioSchema = new Schema({
    name: {type: String, required: true},
    direction: {type: String, required: false},
    long: {type: Number, required: false},
    lat: {type: Number, required:false},
    description: {type: String, required: false},
    activities: {type:[String], required:false},
    price: {type: Number, required: false},
    type: {type: String, required: false},
    image: {type: String, required: false},
    rating: {type: Number, required: false},
    cellphone: {type: Number, required: false},
    schedule: {type: [String], required: false},
    website: {type: String, required: false}
});

//Exporta el modelo
module.exports = mongoose.model('Sitio', sitioSchema);