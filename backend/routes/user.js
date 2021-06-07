const express= require('express');
const routes=express.Router();
const User = require('../models/modelUser.js');
// leer db
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
// ruta crear 
routes.get('/crear', (req, res)=>{
    res.render('./clientes/crearClientes.html', {
        titulo: 'crear clientes'
    });
})
// para guardar
routes.post('/', async(req, res)=>{
    const body = req.body;
    console.log(body);
    try {
       const clientDB = new User(body);
       await clientDB.save();
       res.redirect('/users');

    } catch (error) {
        console.log(error);
    }
})
// ruta de detalles
routes.get('/:id', async(req, res)=>{
    const id = req.params.id;
   // console.log(id);
   try {
       const clientDB= await User.findOne({_id:id});
       res.render('./clientes/editCliente.html',{
           titulo: 'edit cliente',
           cliente: clientDB,
           error: false
       });
   } catch (error) {
       console.log(error);
       res.render('./clientes/editCliente.html',{
        titulo: 'edit cliente',
        error: true,
        sms: 'El usuario no existe'
    });
   }
});
// editar 
routes.put('/:id', async(req, res)=>{
    const id = req.params.id;
    const body = req.body;
    console.log(body);
    try {
        const userDB = await User.findByIdAndUpdate(id, body, {userFindAndModify: false});
        res.json({
            estado:true,
            sms: 'exitoso edit'
        });


    } catch (error) {
        console.log(error);
        res.json({
            estado:false,
            sms: 'fracaso edit'
        });
    }
});
// eliminar
routes.delete('/:id', async(req, res)=>{
    const id = req.params.id;
    try {
        const userDB = await User.findByIdAndDelete({_id: id});
        if(userDB){
            res.json({
                estado:true,
                sms:'eliminado'
            });
        }else{
            res.json({
                estado:false,
                sms:'No eliminado'
            });
        }
    } catch (error) {
       console.log(error); 
    }
})


module.exports=routes;