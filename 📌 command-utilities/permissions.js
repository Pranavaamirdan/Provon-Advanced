const { color } = require("../📌 utilities/text.js");

async function permissionsChecker(Discord,message, command) {
    console.log(`${color["FgGreen"]}[⚹] ${color["end"]}${color["FgMagenta"]}Checking Permissions  ${color["end"]}`);
    const validPermissions = [
        "ADD_REACTIONS",
        "ADMINISTRATOR",
        "ATTACH_FILES",
        "BAN_MEMBERS",
        "CHANGE_NICKNAME",
        "CONNECT",
        "CREATE_INSTANT_INVITE",
        "CREATE_PRIVATE_THREADS",
        "CREATE_PUBLIC_THREADS",
        "DEAFEN_MEMBERS",
        "EMBED_LINKS",
        "KICK_MEMBERS",
        "MANAGE_CHANNELS",
        "MANAGE_EMOJIS_AND_STICKERS",
        "MANAGE_EVENTS",
        "MANAGE_GUILD",
        "MANAGE_MESSAGES",
        "MANAGE_NICKNAMES",
        "MANAGE_ROLES",
        "MANAGE_THREADS",
        "MANAGE_WEBHOOKS",
        "MENTION_EVERYONE",
        "MODERATE_MEMBERS",
        "MOVE_MEMBERS",
        "MUTE_MEMBERS",
        "PRIORITY_SPEAKER",
        "READ_MESSAGE_HISTORY",
        "REQUEST_TO_SPEAK",
        "SEND_MESSAGES",
        "SEND_MESSAGES_IN_THREADS",
        "SEND_TTS_MESSAGES",
        "SPEAK",
        "START_EMBEDDED_ACTIVITIES",
        "STREAM",
        "USE_APPLICATION_COMMANDS",
        "USE_EXTERNAL_EMOJIS",
        "USE_EXTERNAL_STICKERS",
        "USE_PRIVATE_THREADS",
        "USE_PUBLIC_THREADS",
        "USE_VAD",
        "VIEW_AUDIT_LOG",
        "VIEW_CHANNEL",
        "VIEW_GUILD_INSIGHTS",
    ]
    
    if(command.permissions.length){
        let invalidPerms = []
        for(const perm of command.permissions){
            if(!validPermissions.includes(perm)){
                return console.log(`Invalid Permissions ${perm}`);
            }
            if(!message.member.permissions.has(perm)){
                invalidPerms.push(perm);
            }
        }
        if (invalidPerms.length){
            return message.channel.send(`Missing Permissions: \`${invalidPerms}\``);
        }
    }
}

module.exports = { permissionsChecker };