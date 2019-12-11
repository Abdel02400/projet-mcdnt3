const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');

var app = express();
const PORT = 8000;

// on defini le Body Parser
var urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());

// on fait la Définition des CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
    res.setHeader('Access-Control-Expose-Headers', 'x-auth'); // on autorise la lecture dans le header l'en tête x-auth
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var connection = mongoose.connect(
    'mongodb://localhost:27017/PROJET', { useNewUrlParser:true }
);
mongoose.set('useFindAndModify', false);

connection.then(res => {
    
   console.log("Mongodb connecté");

    userRoutes(app);

    app.listen(PORT, () => {
        console.log(`Serveur express écoutant le port ${PORT}...`)
    })


})