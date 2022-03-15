const cooldowns = new Map();
const { color } = require("../📌 utilities/text.js");

async function cooldownsChecker (Discord, client, message, command) {
    if(!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Discord.Collection());
    }

    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = (command.cooldown) * 1000;

    //If time_stamps has a key with the author's id then check the expiration time to send a message to a user.
    if(time_stamps.has(message.author.id)){
        const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

        if(current_time < expiration_time){
            const time_left = (expiration_time - current_time) / 1000;

            const cool_Embed = new Discord.MessageEmbed()
                .setAuthor({
                    name: `${client.user.username}`,
                    iconURL: 'https://cdn.discordapp.com/emojis/845227487364775967.gif?v=1'})
                .setColor('#ff9a00')
                .setTitle(`————————————Cooldowns————————————`)
                .setDescription(`\`Please wait **${time_left.toFixed(1)}** more seconds before using ${command.name}\``)
                .setFooter({
                    text: 'Provon | Cooldown'
                });
    
            return message.reply({ embeds: [ cool_Embed ] }).then(m => setTimeout(() => m.delete(), 5000));
        }
    }

    time_stamps.set(message.author.id, current_time);
    setTimeout(() => time_stamps.delete(message.author.id), 5000);
}

module.exports = { cooldownsChecker };