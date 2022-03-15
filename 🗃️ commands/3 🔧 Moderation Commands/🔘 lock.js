module.exports = {
    name: 'lock',
    aliases: ['l'],
    category: "🔧 Moderation",
    usage:'<prefix>lock enable/disable', 
    permissions: ["SEND_MESSAGES"],
    cooldown: 5,
    description: 'locks a channel',
    async execute(Discord, client, message, args, cmd){
        const memberRole = message.guild.members.roles.highest;
        console.log(memberRole)
    }
}