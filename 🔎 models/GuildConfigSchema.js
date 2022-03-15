const mongoose = require('mongoose');

const GuildConfigSchema = new mongoose.Schema({
    guildId : {
        type : mongoose.SchemaTypes.String,
        required : true,
        unique : true
    },
    prefix : {
        type : mongoose.SchemaTypes.String,
        required : true,
        default : "."
    },
    Verification : {
        verificationState : {
            type : mongoose.SchemaTypes.String,
            default : "Not allowed"
        },
        verificationRole : {
            type : mongoose.SchemaTypes.String,
            default : "none"
        },
        welcomeChannel : {
            type : mongoose.SchemaTypes.String,
            default : "none"
        },
        verificationLogChannel : {
            type : mongoose.SchemaTypes.String,
            default : "none"
        },
    },
    Logs : {
        logState : {
            type : mongoose.SchemaTypes.String,
            required : true,
            default : "Not set"
        },
        logCategory : {
            type : mongoose.SchemaTypes.String,
            //unique : true,
            default : "none"
        },
        serverLogChannel : {
            type : mongoose.SchemaTypes.String,
            //unique : true,
            default : "none"
        },
        joinLeaveLogChannel : {
            type : mongoose.SchemaTypes.String,
            //unique : true,
            default : "none"
        },
        memberLogChannel : {
            type : mongoose.SchemaTypes.String,
            //unique : true,
            default : "none"
        },
        messageLogChannel : {
            type : mongoose.SchemaTypes.String,
            //unique : true,
            default : "none"
        },
        voiceLogChannel : {
            type : mongoose.SchemaTypes.String,
            //unique : true,
            default : "none"
        }
    }
})

module.exports = mongoose.model('GuildConfig', GuildConfigSchema);
