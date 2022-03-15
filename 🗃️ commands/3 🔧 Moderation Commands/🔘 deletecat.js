module.exports = {
    name: 'deletecat',
    aliases: ['dc'],
    category: "🔧 Moderation",
    usage:'deletecat/dc <ChannelId>',
    permissions: ["ADMINISTRATOR"],
    cooldown: 5,
    description: 'clears all/particular messages',
    async execute(Discord, client, message, args, cmd){
        if(!args[0]) {
            return message.lineReply(
            new Discord.MessageEmbed()
          .setDescription(```Please mention the Id of the category```));
        }
          const channel = message.guild.channels.cache.get(args[0]);

            channel.delete();
            channel.children.forEach(channel => channel.delete());
    }
}