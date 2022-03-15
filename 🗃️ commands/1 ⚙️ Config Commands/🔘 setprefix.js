const GuildConfig = require('../../🔎 models/GuildConfigSchema.js');

module.exports = {
    name: 'setprefix',
    aliases: ['sp'],
    category: "⚙️ Config",
    usage:'<prefix>setprefix/sp', 
    permissions: ["SEND_MESSAGES"],
    cooldown: 5,
    description: 'Sets a prefix for this command',
    async execute(Discord, client, message, args, cmd){
            const guildId = message.guild.id;
            const prefix = args[0];
            if(!args[0]){
            try {
                message.reply(new Discord.MessageEmbed()
                        .setAuthor({
                            name: `${message.author.tag}`,
                            iconURL: message.author.displayAvatarURL()})
                        .setDescription(`\`\`\`Please mention the prefix you want to change it to.\`\`\``)
                        .setColor("#ff9a00")
                        );
            } catch (error) {
                console.log(error)
            } finally {
                message.channel.stopTyping()
            }
            } else if(args[0]){
                try{
                message.channel.startTyping()
                const guildConfigDB = await GuildConfig.findOneAndUpdate(
                { guildId },
                { prefix : prefix },
                { new : true }
                );
                
                if(guildConfigDB){
                client.configs.set( guildId, guildConfigDB);
                message.reply(new Discord.MessageEmbed()
                    .setAuthor({
                        name: `${message.author.tag}`,
                        iconURL: message.author.displayAvatarURL()})
                    .setDescription(`\`\`\`✔️ The prefix is set to ${prefix}\`\`\``)
                    .setColor("#ff9a00")
                    );
                    console.log(`A new prefix (${prefix}) was set in ${message.guild.name} and the id is ${message.guild.id}`);
                }else{
                    message.reply(new Discord.MessageEmbed()
                    .setAuthor({
                        name: `${message.author.tag}`,
                        iconURL: message.author.displayAvatarURL()})
                    .setDescription(`You have not setup your guild configuration. Use \`\`\`(:)setup\`\`\``)
                    .setColor("#ff9a00")
                    );
                    console.log(`Failed to set prefix of server ${message.guild.name}`);
                }      
            } catch (error) {
            console.log(error)
            }
        }
    }
}