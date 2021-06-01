const express= require('express');
const routes=express.Router();
const User = require('../models/modelUser.js')
routes.get('/', async(req, res)=>{
    try {
        const arrayUser= await User.find();
        res.render('users.html',{
            titulo:'mis Usuarios', arrayUser
        })
    } catch (error) {
        console.log(error);
    }
})


module.exports=routes;