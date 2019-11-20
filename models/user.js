const mongoose = require('mongoose');
const schema = mongoose.Schema;

//create scheme
const UserSchema = new schema ({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true},
    images: [{type: String}]

});

const User = mongoose.model('Users', UserSchema, "Users");
module.exports = User;
