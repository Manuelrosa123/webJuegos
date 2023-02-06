const express = require('express');

let Juego = require(__dirname + '/../models/juego.js')
let Usuario = require(__dirname + '/../models/usuario.js');
let router = express.Router();

// Servicio de listado

router.get('/', (req, res) => {
    Juego.find().then(resultado => {
        res.render('publico_index', { juegos: resultado});
    }).catch (error => {
        res.status(500)
        .send({ok: false, error: "No se encontraron juegos"});
    }); 
});

router.get('/buscar', (req, res) => {
    Juego.find().then(resultado => {
        if (resultado) {
            let nuevoResultado = resultado.filter((r)=>r.nombre.includes(req.query.buscar))
            res.render('publico_index', {juegos: nuevoResultado});
        } else {
            res.status(500)
                .send({ok: false, error: "No se encontraron juegos"});
        }
    }).catch(error => {
        res.render('publico_error');
    });
});

router.get('/juegos/:id', (req, res) => {
    Juego.findById(req.params.id).then(resultado => {
        if (resultado)
            res.render('publico_juego', { juego: resultado});
        else    
            res.render('publico_error', {error: "Juego no encontrado"});
    }).catch (error => {
        res.render('publico_error');
    }); 
});

module.exports = router;