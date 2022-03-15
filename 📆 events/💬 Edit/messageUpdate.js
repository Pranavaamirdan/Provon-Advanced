const GuildConfig = require('../../🔎 models/GuildConfigSchema.js');

module.exports = async (Discord, client, oldMessage, newMessage) => {
    const guildId = oldMessage.guild.id;
    const guildfetch = await GuildConfig.findOne({ guildId : guildId });
        if(guildfetch){
            if(guildfetch.Logs.logState === 'set'){
                const messageLogChannel = guildfetch.Logs.messageLogChannel;
                const log = await oldMessage.guild.channels.cache.get(messageLogChannel);
                if(oldMessage != newMessage){
                log.send(new Discord.MessageEmbed()
                    .setColor('#4286F4')
                    .setAuthor(client.user.username, client.user.displayAvatarURL())
                    .setTitle(`**\`\`\`✔️ | Message editted in #${oldMessage.channel.name}\`\`\`**`) 
                    .setDescription(`**Before : **${oldMessage.content}\n**+ After :** ${newMessage.content}`)
                    .setFooter('Provon | Message')
                    );
                }
            }
        }
}
//#ff9a00