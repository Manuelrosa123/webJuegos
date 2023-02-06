const express=require("express");

let Usuario = require(__dirname + "/../models/usuario.js");
let router = express.Router();

router.get('/login', (req, res) => {
    Usuario.find().then(resultado => {
        res.render('auth_login');
    }).catch (error => {
    }); 
});

router.post('/login', (req, res) => {
    Usuario.find().then(resultado => {
        res.render('admin_juegos');
    }).catch (error => {
        res.render('auth_login', {error:"Usuario incorrecto"})
    }); 
});

router.get('/logout', (req, res) => {
    Juego.find().then(resultado => {
        res.render('publico_index');
    }).catch (error => {
    }); 
});

module.exports = router;