const jwt = require('jsonwebtoken');
const security = require('./../config/security');
const User = require('./../models/user');

var generateToken = (userId) => {
    return new Promise((resolve, reject) => {

        var token = jwt.sign({userId}, security.JWT_SECRET);

        User.findOneAndUpdate({ _id: userId }, {token})
            .then(() => {
                resolve(token);
            }).catch(error => {
                reject(error)
            })
    })
};

module.exports = generateToken