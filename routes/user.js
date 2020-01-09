const User = require('./../models/user');
const Post = require('./../models/post');
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
            if(req.body.storage === 'addPhoto') callback(null, `${file.originalname}-${Date.now()}.${extension}`);
            else callback(null, `${file.originalname}-avatar.${extension}`)
        },
    });

    const upload = multer({ storage: Storage })

    app.get('/user/:token', (req, res) => {

        const token = req.params.token;
            User.find({"token":token}, {"__v":0}).then(user => {
                if(user.length > 0){
                    var foundPosts = [];
                    Promise.all(user[0].posts.map(post => {
                        return Post.findOne({_id: post}).exec().catch(err => {
                            return null;
                        });
                    })).then(foundPosts => {
                        let photos = foundPosts.map(
                            function(post) {
                                return {url: post.url, id: post._id};
                            }
                        );
                        user = {
                            ...user[0]._doc,
                            posts: photos
                        }
                        res.status(200).send(user);
                    }).catch(err => {
                    });
                }else {
                    res.status(201).send("aucun utilisateur trouvé");
                }
            }).catch(err => {
                res.status(401).send("erreur serveur");
            })
    });

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

    app.post('/initlializeUser', upload.single('fileData'), (req, res) => {
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
    });

    app.post('/UpdateProfil', upload.single('fileData'), (req, res) => {
        var {token} = req.body;

        let extArray = req.file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];

        User.findOneAndUpdate({ token: token }, {avatar: 'avatar.' + extension},{new: true})
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

    app.post('/addPhoto', upload.single('fileData'), (req, res) => {
        var {token} = req.body;

        fs.readFile(req.file.path,(err, contents)=> {
            if (err) {
                res.status(404).send("l'ajout des photos a échoué");
            } else {
                let extArray = req.file.mimetype.split("/");
                let extension = extArray[extArray.length - 1];

                var post = new Post({ url : req.file.filename});

                post.save().then(newPost => {
                    User.findOneAndUpdate({ token: token }, { "$push": { "posts": newPost._id } },{new: true})
                        .then(user => {
                            generateToken(user.id)
                                .then(token => {
                                    var foundPosts = [];
                                    Promise.all(user.posts.map(post => {
                                        return Post.findOne({_id: post}).exec().catch(err => {
                                            return null;
                                        });
                                    })).then(foundPosts => {
                                        let photos = foundPosts.map(
                                            function(post) {
                                                return {url: post.url, id: post._id};
                                            }
                                        );
                                        let Newuser = {
                                            ...user._doc,
                                            posts: photos
                                        }
                                        res.status(200).header('x-auth', token).send(Newuser);
                                    }).catch(err => {
                                    });
                                })
                                .catch(error => {
                                    res.status(401).send("l'ajout du token a échoué");
                                });
                        }).catch(error => {
                        res.status(404).send("l'ajout des photos a échoué");
                    })
                })
            }
        })
    });

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

};