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
                    generateToken(newUser.id)
                        .then(token => {
                            res.status(200).header('x-auth', token).send("Inscription réussi");
                        });
                })
            }
        });
    })

    app.post('/initlializeUser', (req, res) => {
       var {firstname, lastname, token} = req.body.user;
       User.findOneAndUpdate({ token: token }, {firstname: firstname,lastname: lastname, InitializeUser: false},{new: true})
            .then(user => {
                generateToken(user.id)
                    .then(token => {
                        res.status(200).header('x-auth', token).send(user);
                    })
                    .catch(error => {
                        res.status(401).send("l'ajout du token a échoué");
                    });
            }).catch(error => {
            res.status(404).send("l'ajout des information a échoué");
        })
    })

    app.post('/login', (req, res) => {
        var {email, password} = req.body.user;
        User.findOne({"email":email}, {"__v":0}).then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, comparaison) => {
                    if (comparaison) {
                        generateToken(user.id)
                            .then(token => {
                                res.status(200).header('x-auth', token).send(user);
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