const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');//

const flash = require('connect-flash');
require('./pasport/local_autenticated.js');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

require('dotenv').config();

const PORT = process.env.PORT || 8080;

// settings

//app.set('PORT', 3000);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.engine('html', require('ejs').renderFile);

//midlewares
// => control session
function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login')
  }


app.use(session({// es para asegurarnos q esta session no sea bulnerable
    secret:'esunsecreto',
    resave: false,
    saveUninitialized: true
}));
app.use(flash()); //para decir q vamos a usar
app.use(passport.initialize());// es para inicializar passport
app.use(passport.session());//para almacenar datos en session

app.use((req, res, next)=>{
    app.locals.smsRegistro = req.flash('smsRegistroN');
    app.locals.smsLogin = req.flash('smsLogin');
    app.locals.smsConfirm = req.flash('smsConfirmN');
    //app.locals.smsValidUser= req.flash('smsValidUser');
    next();
});
// routes 
app.use('/', require('./routes/routes.js'));

app.use('/comentarios',require('./routes/comentario.js'));


// static files 
app.use(express.static(path.join(__dirname,'public')));

// coneccion a base de datos
//const uri=`mongodb+srv://${process.env.USER}:${process.env.PW}@cluster0.mzzar.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;
mongoose.connect(process.env.URI_MONGO, 
{useNewUrlParser: true, useUnifiedTopology: true
}).then( ()=>console.log('conexion exitosa a base de datos'))
.catch((error)=>console.log(error))
// listen
app.listen(PORT,()=>{
   
   // console.log(path.join(__dirname,'views/index.html'));
    console.log(`servidor en el puert ${PORT}` );
});