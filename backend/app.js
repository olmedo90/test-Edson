const express = require('express');
const app = express();
const path = require('path');


// settings
app.set('port',4000);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.engine('html', require('ejs').renderFile);
//midlewares

// routes 
app.use(require('./routes/routes.js'));
// static files 
app.use(express.static(path.join(__dirname,'public')));
// listen
app.listen(app.get('port'),()=>{
    console.log(__dirname+'/views/index.html');
    console.log(path.join(__dirname,'views/index.html'));
    console.log('servidor en el puert0',app.get('port'));
});