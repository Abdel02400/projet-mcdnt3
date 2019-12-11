const User = require('./../models/user');
const cryptPassword = require('../middleware/cryptPassword');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

module.exports = (app) => {

    app.get('/user/:token', (req, res) => {

        const token = req.params.token;
            User.find({"token":token}, {"__v":0}).then(user => {
                res.status(200).send(user[0]);
            }).catch(err => {
                res.status(404).send("aucun utilisateur trouver avec ce token");
            })

    })

    app.post('/signup', cryptPassword, (req, res) => {
        var user = new User(req.body.user);
        User.find({email : user.email},function(err,existingEmail){
            if (!err && existingEmail.length > 0){
                res.status(201).send("mail used");
            } else {
                user.save().then(newUser => {
                    res.status(201).send("Inscription réussi");
                })
            }
        });
    })

    app.post('/login', (req, res) => {
        var {email, password} = req.body.user;
        User.find({"email":email}, {"__v":0}).then(user => {
            if (user.length > 0) {
                bcrypt.compare(password, user[0].password, (err, comparaison) => {
                    if (comparaison) {
                        generateToken(user[0].id)
                            .then(token => {
                                res.status(200).header('x-auth', token).send({"isConnected":true});
                            });

                    } else {
                        res.status(201).send('PASSWORD_NOT_MATCH');
                    }
                })

            } else {
                res.status(201).send('EMAIL_NOT_MATCH');
            }
        })


    });

}