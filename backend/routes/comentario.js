const express= require('express');
const routes=express.Router();
const Comentario = require('../models/modelComentarios.js');

routes.get('/comentados', async(req, res)=>{
    try {

        const arrayComentarios = await Comentario.find({});
        // const arr = arrayComentarios.map(elemento => Object.entries(elemento));
        // console.log(arrayComentarios);
        res.send( 
        arrayComentarios
     );
    } catch (error) {
        console.log(error);
    }
})

routes.get('/', async(req, res)=>{
    try {

        const arrayComentarios = await Comentario.find({});
        // const arr = arrayComentarios.map(elemento => Object.entries(elemento));
        // console.log(arrayComentarios);
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
routes.get('/delete/:id', async(req, res)=>{
    const id = req.params.id;
    //console.log(id);
    try {
         await Comentario.findOneAndDelete({_id:id});
         res.redirect('/comentarios');
       
    } catch (error) {
        console.log(error);
    }
});
// estado de funcion
routes.get('/estado/:id', async(req, res)=>{
    const id = req.params.id;
    try {
        const comentarioDB = await Comentario.findById({_id : id});
        comentarioDB.estado= !comentarioDB.estado;
        await comentarioDB.save();
        res.redirect('/comentarios');
    } catch (error) {
        console.log(error);
    }
});
// ruta editar
routes.get('/edit/:id', async(req, res)=>{
    const id = req.params.id;
    try {
        const comentarioDB = await Comentario.findById({_id : id});
        console.log(comentarioDB);
        res.render('./comentarios/edit.html',{
            titulo:'editar', comentarioDB
        })
    } catch (error) {
        console.log(error);
    }
});
//editar
routes.post('/edit/:id', async(req, res)=>{
    const datos = req.body;
    console.log(datos);
    try {
        const id = req.params.id;
        var newvalues = { $set: {name: "Mickey", address: "Canyon 123" } };
         await Comentario.update({_id : id}, datos);
       /// console.log(comentarioDB);
        res.redirect('/comentarios');
    } catch (error) {
        console.log(error);
    }
});
// eliminar collection

// routes.get('/drop', async(req, res)=>{
//     try {
//         var dbo = .db("usuarios");
//        await dbo.dropCollection("comentarios");
//        res.redirect('/comentarios');
//     } catch (error) {
//         console.log(error);
//     }
// })


module.exports = routes;