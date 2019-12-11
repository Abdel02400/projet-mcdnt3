const bcrypt = require('bcryptjs');

var cryptPassword = (req, res, next) => {

    var password = req.body.user.password.toString();

    bcrypt.genSalt(8, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            req.body.user.password = hash;
            next();
        })
    })
}

module.exports = cryptPassword