const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("Testing slash commands"),
    async execute(Discord, client, interaction) {
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
                name: `${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL()})    
            .setTitle('Test')
            .setDescription(`\`\`\`This is a test message\`\`\``)
            .setColor('#ff9a00');

        interaction.reply({
            embeds: [embed],
            components: [list]
        });
    }
}