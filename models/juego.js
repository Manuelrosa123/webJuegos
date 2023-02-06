const { default: mongoose } = require("mongoose");

let edicionSchema=new mongoose.Schema({
    edicion:{
        type:String,
        required:true
    },
    anyo:{
        type:Number,
        min:2000,
        max: new Date().getFullYear()
    }
});


let juegosSchema= new mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        minlength:6,
        trim:true
    },
    descripcion: {
        type:String,
        required:true,
        trim:true
    },
    edad: {
        required:true,
        type: Number,
        min:0,
        max:100
    },
    jugadores:{
        required:true,
        type:Number
    },
    tipo:{
        type:String,
        required:true,
        enum:["rol","escape","dados","fichas","cartas","tablero"]
    },
    precio:{
        type:Number,
        required:true,
        min:0
    },
    imagen:{
        type:String
    },
    Ediciones:[edicionSchema]
});

let Juego = mongoose.model('juegos', juegosSchema);

module.exports = Juego;