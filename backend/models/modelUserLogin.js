const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username:  String,
  password: String
});
// para encriptar password
userSchema.methods.encryptPassword = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10)); // para cifrar el codigo
 };
// para comparar
 userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password); // this pasword es el dato que envio el usuario
}
const userModel = mongoose.model('registrados', userSchema);
 module.exports=userModel;
