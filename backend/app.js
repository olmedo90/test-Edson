const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

// settings
//app.set('PORT', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.engine('html', require('ejs').renderFile);
//midlewares

// routes 
app.use(require('./routes/routes.js'));
// static files 
app.use(express.static(path.join(__dirname,'public')));
// listen
app.listen(PORT,()=>{
   
   // console.log(path.join(__dirname,'views/index.html'));
    console.log(`servidor en el puert0 ${PORT}`);
});