const express= require('express');
const routes=express.Router();
const passport = require('passport');

routes.get('/',(req, res)=>{
    res.render('login.html',{titulo:'login'});
});


//ruta registrar
routes.get('/registrar', (req, res, next)=>{
    res.render('registrar.html', {titulo: 'registrar'});
});
// guardar registro
routes.post('/registrar', passport.authenticate('local-registro',{
    successRedirect:'/perfil',
    failureRedirect:'/registrar',
    passReqToCallback: true//es para pasar internamente los datos recibidos del cliente
}));

// ruta login
routes.get('/login', (req, res, next)=>{
    res.render('login.html', {titulo: 'login'});
});
// para  login
routes.post('/login', passport.authenticate('local-login',{
    successRedirect:'/perfil',
    failureRedirect:'/login',
    passReqToCallback: true//es para pasar internamente los datos recibidos del cliente
}));

// para salir del login
routes.get('/logout',(req, res, next)=>{
    req.logout();
    res.redirect('/login');
})

routes.get('/perfil',isAuthenticated, (req, res, next)=>{
    res.render('index.html', {titulo: 'perfil'});
});

//middleware
// verificar autentificacion
function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login')
  }

module.exports=routes;

