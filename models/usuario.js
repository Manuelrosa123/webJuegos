const { default: mongoose } = require("mongoose");

let usuarioSchema=new mongoose.Schema({
    login:{
        type:String,
        required:true,
        unique:true,
        minlength: 5
    },
    password:{
        type:String,
        minlength:8,
        required:true
        //encriptar
    }
});

let Usuario = mongoose.model('usuario', usuarioSchema);

module.exports = Usuario;