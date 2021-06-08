const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComentarioSchema = new Schema({
  email:  String,
  comentario:String
});

// Crear el modelo
const comentarioModel = mongoose.model('comentarios', ComentarioSchema);// clientes nombre de la coleccion

module.exports = comentarioModel;