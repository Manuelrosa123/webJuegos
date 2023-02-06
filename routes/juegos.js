const express=require("express");
const multer = require("multer");

let Juego = require(__dirname + "/../models/juego.js");
let router = express.Router();

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
    }
  })

let upload = multer({storage: storage});

router.get('/', (req, res) => {
    Juego.find().then(resultado => {
        res.render('admin_juegos', { juegos: resultado});
    }).catch (error => {
        res.render('admin_error');
    }); 
});

router.get('/juegos/nuevo', (req, res) => {
    res.render('admin_juegos_form');
});

router.get('/juegos/editar/:id', (req, res) => {
    Juego.findById(req.params['id']).then(resultado => {
        if (resultado) {
            res.render('admin_juegos_form', {juego: resultado});
        } else {
            res.render('admin_error', {error: "Juego no encontrado"});
        }
    }).catch(error => {
        res.render('admin_error', {error: "Error en la aplicación"});
    });
});

router.post('/juegos', upload.single('imagen'), (req, res) => {
    let nuevoJuego = new Juego({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        edad: req.body.edad,
        jugadores: req.body.jugadores,
        tipo: req.body.tipo,
        precio: req.body.precio,
        imagen: req.file.filename
        //ediciones:
    });
    nuevoJuego.save().then(resultado => {
        //res.redirect('juegos');
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('admin_error', {error: "Error insertando juego"});
    });
});

router.put('/juegos/:id'/*,  upload.single('imagen')*/, (req, res) => {
    Juego.findByIdAndUpdate(req.params.id, {
        $set: {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            edad: req.body.edad,
            jugadores: req.body.jugadores,
            tipo: req.body.tipo,
            precio: req.body.precio,
            //imagen: req.file.filename
        }
    }, {new: true}).then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('admin_error', {error: "Error modificando juego"});
    });
});

router.delete('/juegos/:id', (req, res) => {
    Juego.findByIdAndRemove(req.params.id).then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('admin_error', {error: "Error borrando juego"});
    });
});

module.exports = router;

/*
Router.get('/', (req,res) => {              // Get General
    Juego.find().then(resultado=>{
        res.status(200)
            .send({ok:true,resultado});
    }).catch(error=>{
        res.status(500)
            .send({ok:false,error:"No se encontraron juegos de mesa"});
    });
});

Router.get('/:id', (req,res)=>{             // Get por ID
    Juego.findById(req.params['id']).then(resultado=>{
        res.status(200)
            .send({ok:true,resultado});
        }).catch(error=>{
            res.status(400)
                .send({okf:false, error:"juego no encontrado"});
        });
});


Router.post('/', (req,res)=>{               // Post

    let juegoCreado= new Juego({
        nombre:req.body.nombre,
        descripcion:req.body.descripcion,
        edad:req.body.edad,
        jugadores:req.body.jugadores,
        tipo:req.body.tipo,
        precio:req.body.precio,
        imagen:req.body.imagen
    });

    juegoCreado.save().then(resultado=>{
        res.status(200)
            .send({ok:true, resultado});
    }).catch(error =>{
        res.status(400)
            .send({ok:false, error:"Error insertando el Juego"});
    });
});

Router.put('/:id', (req,res)=>{             // Put por ID

    let juegoCambiado = {
        nombre:req.body.nombre,
        descripcion:req.body.descripcion,
        edad:req.body.edad,
        jugadores:req.body.jugadores,
        tipo:req.body.tipo,
        precio:req.body.precio,
        imagen:req.body.imagen
    }

    Juego.findByIdAndUpdate(req.params['id'], juegoCambiado, {new:true}).then(resultado=>{
        res.status(200)
            .send({ok:true, resultado});
    }).catch(error =>{
        res.status(400)
            .send({ok:false, error:"Error actualizando el Juego"});
    });

});

Router.delete('/:id' , (req,res)=>{         // Delete por ID

    Juego.findByIdAndRemove(req.params['id']).then(resultado=>{
        res.status(200)
            .send({ok:true, resultado});
    }).catch(error =>{
        res.status(400)
            .send({ok:false, error:"Error eliminando el Juego"});
    });
});

Router.put('/ediciones/:idJuego', (req,res)=>{  //Put de Edicion por ID del Juego
    
    let edicionCambiada = {
        edicion : req.body.edicion,
        anyo : req.body.anyo
    }

    Juego.findByIdAndUpdate(req.params['idJuego'], edicionCambiada, {new:true}).then(resultado=>{
        resultado.Ediciones.push(edicionCambiada);

        resultado.save().then(resultado=> {
            res.status(200)
                .send({ok:true, resultado});
        }).catch(error =>{
            res.status(400)
                .send({ok:false, error:"Error actualizando la edición"});
        });
    });
});


Router.delete('/ediciones/:idJuego/:idEdicion', (req,res)=>{  // Delete de Edición por ID del Juego e ID de la edición

    Juego.findById(req.params['idJuego']).then(resultado=>{
        let nuevasEdiciones = resultado.Ediciones.filter(r=>r.id!=req.params['idEdicion']);
    

        Juego.findByIdAndUpdate(req.params['idJuego'],{Ediciones:nuevasEdiciones}, {new:true})
            .then(resultado=>{
                res.status(200)
                    .send({ok:true, resultado:nuevasEdiciones});
            }).catch(error =>{
                res.status(400)
                    .send({ok:false, error:"Error eliminando la edición"});
        });
    });
});*/
