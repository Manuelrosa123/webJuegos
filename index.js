// Carga de librerías
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');

const session = require('express-session');


// Enrutadores
const juegos = require(__dirname + '/routes/juegos');
const publico = require(__dirname + '/routes/publico')
const auth = require(__dirname + '/routes/auth')

// Conectar con BD en Mongo 
mongoose.connect('mongodb://mymongodb/playrest_v3', 
    {useNewUrlParser: true});

// Inicializar Express
let app = express();

// Configuramos motor Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Asignación del motor de plantillas
app.set('view engine', 'njk');

// Cargar middleware body-parser para peticiones POST y PUT y enrutadores

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Middleware para procesar otras peticiones que no sean GET o POST
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    } 
}));

// Cargamos ahora también la carpeta "public" para el CSS propio
app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

app.use('/', publico);
app.use('/admin', juegos);
app.use('/auth', auth);



let misUsuarios=["Manu","Manolito"];

// Puesta en marcha del servidor
app.listen(8080);