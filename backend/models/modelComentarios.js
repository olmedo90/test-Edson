const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComentarioSchema = new Schema({
  email:  String,
  comentario:String,
  estado:{
    type: Boolean,
    default: true
  }
},{
  versionKey: false
});

// Crear el modelo
const comentarioModel = mongoose.model('comentarios', ComentarioSchema);// clientes nombre de la coleccion

module.exports = comentarioModel;