// server.js

// CONFIGURACIÓN BASE
// =============================================================================

// IMPORT DE PAQUETES REQUERIDOS
var express    = require('express');        // express
var app        = express();                 // Defina nuestra app de express
var bodyParser = require('body-parser');

// Configuración de odyParser()
// Esto nos permitirá obtener los datos de un POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // puerto de salida

// RUTAS PARA NUESTRA API
// =============================================================================
var router = express.Router();              // instancia de express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Bienvenido a nuestra api!' });
});

// Aquí el resto de rutas que se necesiten

// REGISTRAMOS NUESTRAS RUTAS -------------------------------
// Todas nuestras rutas serán prefijadas con /api
app.use('/api', router);

// INICIAMOS EL SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
