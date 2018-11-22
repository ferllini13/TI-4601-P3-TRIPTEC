const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

let usuarioSchema = new Schema({
    id: {type: String, required: true, unique: true,  min: 9, max:9},
    type: {type: String, required: true, min:0, max:1},
    user: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

//Exporta el modelo
module.exports = mongoose.model('Usuario', usuarioSchema);