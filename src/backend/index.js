//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

const cors = require('cors');
const jwt = require('jsonwebtoken');

var express = require('express');
var app     = express();
var pool   = require('./mysql-connector');

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// DECLARE JWT-secret
const JWT_Secret = 'your_secret_key';

var testUser = { username: 'test', password: '1234' };

const auth = function (req, res, next) {
    let autHeader = (req.headers.authorization || '')
    if (autHeader.startsWith('Bearer ')) {
        token = autHeader.split(' ')[1]
    } else {
        res.status(401).send({ message: "No hay token en la cabecera" })
    }
    jwt.verify(token, JWT_Secret, function(err) {
        if (err) {
            console.log('error en el token')
            res.status(403).send({ meesage: "Token inválido" })
        }
    })
    next()
}

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));
// to enable cors
app.use(cors(corsOptions));

//=======[ Main module code ]==================================================

app.get('/', function(req, res, next) {
    res.send({'mensaje': 'Bienvenidos a DAM'}).status(200);
});

app.get('/devices', auth, function(req, res, next) {
    pool.query('Select * from Dispositivos', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

// Devuelve información de un solo dispositivo
app.get('/devices/:id', function(req, res, next) {
    console.log("Devices recibe ", req.params.id)
    pool.query('SELECT * FROM Dispositivos WHERE dispositivoId = ?;', [req.params.id], (err, result) => {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

// Devuelve la ultima medición de un dispositivo
app.get('/lastmeasurement/:id', function(req, res, next) {
    console.log("Last M recibe ", req.params.id)
    pool.query('SELECT * FROM Mediciones WHERE dispositivoId = ? order by fecha desc limit 1;', [req.params.id], (err, result) => {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

// Devuelve todas las mediciones de un dispositivo
app.get('/measurements/:id', function(req, res, next) {
    console.log("Measurements recibe ", req.params.id)
    pool.query('SELECT * FROM Mediciones WHERE dispositivoId = ?;', [req.params.id], (err, result) => {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

// Devuelve todos los registros de riego de una electroválvula en particular
app.get('/waterlog/:id', function(req, res, next) {
    console.log("Waterlog recibe ", req.params.id)
    pool.query('SELECT * FROM Log_Riegos a join Dispositivos b on a.electrovalvulaId = b.electrovalvulaId WHERE b.dispositivoId = ?;', [req.params.id], (err, result) => {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

// Cambiar estado de la válvula (con query en el path ../ --> URL/key1=param1&key2=param2&...&keyN=paramN)
app.post('/changestate', (req, res) => {
    console.log("Changestate recibe ", req.body.apertura, ' ', req.body.fecha, ' ', req.body.electrovalvulaId)
    if (req.body.apertura !=undefined && req.body.fecha!=undefined && req.body.electrovalvulaId!=undefined) {
        console.log("Parametros recibidos correctamente.")
        pool.query('INSERT INTO `Log_Riegos` (`apertura`, `fecha`, `electrovalvulaId`) VALUES (?,?,?);', [req.body.apertura, req.body.fecha, req.body.electrovalvulaId], (err, result) => {
            if (err) {
                res.send(err).status(400);
                return;
            }
            res.send(result);
        });
    }
    else {
        console.log("ERROR: Parametros incorrectos o no recibidos.");
        res.sendStatus(400);
    }
});

// Actualizar las mediciones
app.post('/updatemeasurements', (req, res) => {
    console.log("Updatemeasurements recibe ", req.body.fecha, ' ', req.body.valor, ' ', req.body.dispositivoId)
    if (req.body.fecha !=undefined && req.body.valor!=undefined && req.body.dispositivoId!=undefined) {
        console.log("Parametros recibidos correctamente.")
        pool.query('INSERT INTO `Mediciones` (`fecha`, `valor`, `dispositivoId`) VALUES (?,?,?);', [req.body.fecha, req.body.valor, req.body.dispositivoId], (err, result) => {
            if (err) {
                res.send(err).status(400);
                return;
            }
            res.send(result);
        });
    }
    else {
        console.log("ERROR: Parametros incorrectos o no recibidos.");
        res.sendStatus(400);
    }
});


app.post('/authenticate', (req, res) => {

    if (req.body) {
        var user = req.body;
        console.log(user);

        if (testUser.username === req.body.username && testUser.password === req.body.password) {
            var token = jwt.sign(user, JWT_Secret);
            res.status(200).send({
                signed_user: user,
                token: token
            });
        } else {
            res.status(403).send({
                errorMessage: 'Auth required!'
            });
        }
    } else {
        res.status(403).send({
            errorMessage: 'Please provide username and password'
        });
    }

});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
