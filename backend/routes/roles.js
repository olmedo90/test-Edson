const express= require('express');
const routes=express.Router();


routes.get('/',(req, res)=>{
    

        res.render('./roles/roles.html', 
        {titulo:'roles'
    });   
});

module.exports=routes;