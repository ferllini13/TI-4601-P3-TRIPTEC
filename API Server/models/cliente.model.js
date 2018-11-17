const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

let clienteSchema = new Schema({
    id: {type: String, required: true, unique: true,  min: 9, max:9},
    name: {type: String, required: true},
    correo: {type: String, required: true},
    phone: {type: String, required:true},
    birth: {type: Date, required: true},
    wishlist: {type: [String], required: false}
});

//Exporta el modelo
module.exports = mongoose.model('Cliente', clienteSchema);
