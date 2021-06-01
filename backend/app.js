const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

require('dotenv').config();

const PORT = process.env.PORT || 8080;

// settings

//app.set('PORT', 3000);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.engine('html', require('ejs').renderFile);
//midlewares

// routes 
app.use('/', require('./routes/routes.js'));
app.use('/users', require('./routes/user.js'));
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