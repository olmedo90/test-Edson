const express= require('express');
const routes=express.Router();

routes.get('/',(req, res)=>{
    res.render('index.php',{titulo:'sis 414'});
});

routes.get('/practicas',(req, res)=>{
    res.render('practicas.html',{titulo:'practicas'});
});

module.exports=routes;

