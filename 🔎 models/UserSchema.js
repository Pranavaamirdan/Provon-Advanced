const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Name : mongoose.SchemaTypes.String,
    Id : {
        type : mongoose.SchemaTypes.String,
        required : true
    }
})

module.exports = mongoose.model('User', UserSchema);
