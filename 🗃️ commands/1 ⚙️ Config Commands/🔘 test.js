module.exports = {
    name: 'test',
    aliases: ['t'],
    category: "⚙️ Config",
    usage:'<prefix>test/t', 
    permissions: ["SEND_MESSAGES"],
    cooldown: 5,
    description: 'Tests the bot',
    async execute(Discord, client, message, args, cmd){
        let list = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
          .setStyle("SUCCESS")
          .setLabel("✔️")
          .setCustomId("server"),
          new Discord.MessageButton()
            .setStyle("DANGER")
            .setLabel("❌")
            .setCustomId("dm"));

        const embed = new Discord.MessageEmbed()
        .setAuthor({
            name: `${message.author.tag}`,
            iconURL: message.author.displayAvatarURL()})    
        .setTitle('Test')
        .setDescription(`\`\`\`This is a test message\`\`\``)
        .setColor('#ff9a00');

        message.reply({
            embeds: [embed],
            components: [list]
        });
    }
}