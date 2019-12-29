const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    password: String,
    role: String,
    firstname: { type: String, default: null },
    lastname:{ type: String, default: null },
    InitializeUser: { type: Boolean, default: true },
    token: { type: String, default: null },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;