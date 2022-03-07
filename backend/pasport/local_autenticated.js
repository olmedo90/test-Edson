const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/modelUserLogin.js');

// para guardar datos login 
passport.serializeUser((user, done)=>{
    done(null, user.id);// guarda el ID d3l usuario
});
// para desacticar login
passport.deserializeUser(async(id, done)=>{
    const user = await  User.findById(id);
    done(null, user);
 });
 
// para controlar registro
 passport.use('local-registro', new LocalStrategy({
    usernameField: 'username',//nombres del form
    passwordField: 'password',
    passReqToCallback: true // es para indicar que tal ves enviemos mas datos y los reciva
},async (req, username, password, done)=>{// done espara responder despues de recibir los datos
    // validar
    const us = await User.findOne({username:username});
  // console.log(us);
    if(us){
        return done(null, false, req.flash('smsRegistroN', 'El usuario ya existe.'));
    //fin validacio
    }else{
        const newUser = new User();//recibe los datos q envia el usuarrio
        newUser.username = username;
        newUser.password = newUser.encryptPassword(password);//para decile q no los encripte
        await newUser.save();
        done(null, false, req.flash('smsConfirmN', 'Usuario registrado exitosamente'));
    }
}));

// para controlar login'

passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, username, password, done) => {
    const user = await User.findOne({username:username});
    if(!user) {
      return done(null, false, req.flash('smsLogin', 'Usuario no existe'));
    }
    if(!user.comparePassword(password)) {
      return done(null, false, req.flash('smsLogin', 'contraseña incorrecto'));
    }
    return done(null, user);
  }));