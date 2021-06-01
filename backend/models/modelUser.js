const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nombre:  String,
  apellido: String,
  email:String
});

// Crear el modelo
const UserModel = mongoose.model('users', UserSchema);// clientes nombre de la coleccion

module.exports = UserModel;