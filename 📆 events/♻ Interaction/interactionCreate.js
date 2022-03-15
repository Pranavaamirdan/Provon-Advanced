const { MessageButton, MessageActionRow } = require("discord.js");
require('dotenv').config();

module.exports = async (Discord, client, interaction) => {
    if (!interaction.isCommand()) return;
	const command = client.slashCommands.get(interaction.commandName);

	if (!command) {
		const embed = new Discord.MessageEmbed()
        .setAuthor({
            name: `${interaction.user.tag}`,
            iconURL: interaction.user.displayAvatarURL()})    
      	.setTitle(`————————————Command————————————`)
		  .addField(`❌ There is no command named ${command}`,`—————————————————————————————————`)
        .setColor('#ff9a00')
		.setFooter({
			text: 'Provon | Cooldowns',
			iconURL: 'https://cdn.discordapp.com/emojis/845319864901959701.gif?v=1'});

        await interaction.reply({
            embeds: [embed]
        });
	}

	try {
		await command.execute(Discord, client, interaction);
	} catch (err) {
		console.log(err);

		await interaction.reply({
			content: "An error occured while executing the command.",
			ephemeral: true
		});
	}
}