const User = require('./../models/user');
const cryptPassword = require('../middleware/cryptPassword');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const fs = require('fs');

module.exports = (app) => {

    const Storage = multer.diskStorage({
        destination(req, file, callback) {
            callback(null, `./images`)
        },
        filename(req, file, callback) {
            let extArray = file.mimetype.split("/");
            let extension = extArray[extArray.length - 1];
            callback(null, `${file.originalname}-avatar.${extension}`)
        },
    })

    const upload = multer({ storage: Storage })

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
                            res.status(200).header('x-auth', token).send(newUser.id);
                        });
                })
            }
        });
    })

    app.post('/initlializeUser',upload.single('fileData'), (req, res) => {
       var {firstname, lastname, description, avatarUri, token} = req.body;

        let extArray = req.file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];

       User.findOneAndUpdate({ token: token }, {firstname: firstname,lastname: lastname,description: description, avatar: 'avatar.' + extension, InitializeUser: false},{new: true})
            .then(user => {
                fs.readFile(req.file.path,(err, contents)=> {
                    if (err) {
                        res.status(404).send("l'ajout des information a échoué");
                    } else {
                        generateToken(user.id)
                            .then(token => {
                                res.status(200).header('x-auth', token).send(user);
                            })
                            .catch(error => {
                                res.status(401).send("l'ajout du token a échoué");
                            });
                    }
                })
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