const GuildConfig = require('../../🔎 models/GuildConfigSchema.js');

module.exports = {
    name: 'setup',
    aliases: ['sp'],
    category: "⚙️ Config",
    usage:'<prefix>', 
    permissions: ["ADMINISTRATOR"],
    cooldown: 5,
    description: 'helps with the command',
    async execute(Discord, client, message, args, cmd){
        const guildId = message.guild.id;
        try {
            const guildConfigDB = await GuildConfig.findOne({ guildId });
            if(guildConfigDB){
                const done = new Discord.MessageEmbed()
                    .setAuthor({
                        name: `${message.author.tag}`,
                        iconURL: message.author.displayAvatarURL()})
                    .setDescription(`\`\`\`You already have a configuration setup\`\`\``)
                    .setColor('#ff9a00')
                
                message.reply({ embeds: [done]});
            } else {
                const GuildConfigDB = await GuildConfig.create({ 
                    guildId : guildId,
                    prefix : '.',
                }).then(() => {
                    const success = new Discord.MessageEmbed()
                    .setAuthor({
                        name: `${message.author.tag}`,
                        iconURL: message.author.displayAvatarURL()})
                    .setDescription(`\`\`\`✔️ A configuration is set for this server\`\`\``)
                    .setColor('#ff9a00')

                    message.reply({ embeds: [success]});
                    console.log(`Config was created in ${message.guild.name}`)
                }).catch((err) => {
                    console.log(err)
                    
                    const failure = new Discord.MessageEmbed()
                    .setAuthor({
                        name: `${message.author.tag}`,
                        iconURL: message.author.displayAvatarURL()})
                    .setDescription(`\`\`\`failed to create a config\`\`\``)
                    .setColor('#ff9a00');
                    
                    message.reply({ embeds: [failure]});
                });
                client.configs.set(guildId, GuildConfigDB);
            }
        } catch (error) {
            console.log(error)
            message.reply({text: `<@${message.author.id}>, An error occured`});
        }
    }
}