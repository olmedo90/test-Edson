const express= require('express');
const routes=express.Router();
const Comentario = require('../models/modelComentarios.js');

routes.get('/', async(req, res)=>{
    try {
        const arrayComentarios = await Comentario.find();
        res.render('./comentarios/comentarios.html', 
        {titulo:'comentarios', 
        arrayComentarios
     });
    } catch (error) {
        console.log(error);
    }
})

// para guardar
routes.post('/', async(req, res)=>{
    const body = req.body;
    console.log(body);
    try {
       const comentarioDB = new Comentario(body);
       await comentarioDB.save();
       res.redirect('/comentarios');

    } catch (error) {
        console.log(error);
    }
})

// eliminar 
routes.delete('/:id', async(req, res)=>{
    const id = req.params.id;
   // console.log(id);
    try {
        const comentarioDB = await Comentario.findByIdAndDelete({_id:id});
        if(comentarioDB){
            res.json({
                estado: true,
                mensaje:'eliminado satisfactoriamente'
            })
        }else{
            res.json({
                estado: false,
                mensaje:'no se elimino'
            })
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = routes;