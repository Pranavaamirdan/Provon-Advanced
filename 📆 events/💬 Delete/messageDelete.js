const GuildConfig = require('../../🔎 models/GuildConfigSchema.js');

module.exports = async (Discord, client, message) => {
    const guildId = message.guild.id;
    const guildfetch = await GuildConfig.findOne({ guildId : guildId });
        if(guildfetch){
            if(guildfetch.Logs.logState === 'set'){
                const messageLogChannel = guildfetch.Logs.messageLogChannel;
                const log = await message.guild.channels.cache.get(messageLogChannel);
                if(message.content != "" && message.content != message.content){
                    log.send(new Discord.MessageEmbed()
                        .setColor('#DD5E53')
                        .setAuthor(client.user.username, client.user.displayAvatarURL()) 
                        .setTitle(`**\`\`\`✔️ | Message deleted in #${message.channel.name}\`\`\`**`) 
                        .setDescription(`\`${message.content} was deleted.\``)
                        .setFooter('Provon | Message')
                    );
                }
            }
        }
}
//#ff9a00