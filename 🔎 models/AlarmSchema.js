const mongoose = require('mongoose');

const AlarmSchema = new mongoose.Schema({
    Name : mongoose.SchemaTypes.String,
    Id : {
        type : mongoose.SchemaTypes.String,
        required : true
    },
    alarmName : {
        type : mongoose.SchemaTypes.String,
    },
    alarmTime : {
        days : {
            type : mongoose.SchemaTypes.Array,
            default : 'none'
        },
        hour : {
            type : mongoose.SchemaTypes.String,
            default : 'none'
        },
        minute : {
            type : mongoose.SchemaTypes.String,
            default : 'none'
        },
    }
})

module.exports = mongoose.model('Alarm', AlarmSchema);
