module.exports = {
    name: 'unmute',
    aliases: ['um'],
    category: "🔧 Moderation",
    usage:'<prefix>unmute/um @member <time>s', 
    permissions: ["ADMINISTRATOR"],
    cooldown: 5,
    description: 'unmute command',
    async execute(Discord, client, message, args, cmd){
        const member = message.mentions.users.first();
        if(member){
            let mainRole = message.guild.roles.cache.find(role => role.name === '🧑Member🧑');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

            let memberTarget= message.guild.members.cache.get(member.id);
            message.delete({ timeout: 50, reason: 'simply'});
            memberTarget.roles.remove(muteRole.id);
            memberTarget.roles.add(mainRole.id);

            const unmute_embed = new client.MessageEmbed()
                .setColor('#ff9a00')
                .setDescription(`**<@${memberTarget.user.id}> has been unmuted ❕**`)
                .setFooter({
                    text: 'Provon | Unmute'
                });

            message.channel.send({ embeds: unmute_embed }).then(msg => msg.delete({ timeout: 5000 }));
        } else{
            message.channel.send('Cant find that member❕');
        }
    }
}