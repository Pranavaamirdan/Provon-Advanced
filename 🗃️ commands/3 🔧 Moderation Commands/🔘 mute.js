module.exports = {
    name: 'mute',
    aliases: ['m'],
    category: "🔧 Moderation",
    usage:'<prefix>mute/m @member <time>s', 
    permissions: ["ADMINISTRATOR"],
    cooldown: 5,
    description: 'mute command',
    async execute(Discord, client, message, args, cmd){
        const member = message.mentions.users.first();
    
    if (member) {

        let mainRole = message.guild.roles.cache.find(role => role.name === '🧑Member🧑');
        if(!mainRole) mainRole = message.guild.roles.create({ data: { name: '🧑Member🧑',color: '#2f3136',}, reason: 'To mute the person with this role',}).then( console.log ).catch( console.error );
        
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if(!muteRole) muteRole = message.guild.roles.create({ data: { name: 'Muted',color: '#2f3136',}, reason: 'To mute the person with this role',}).then( console.log ).catch( console.error );

        let memberTarget = message.guild.members.cache.get(member.id);

        if (!args[1]) {
            message.delete({ timeout: 50, reason: 'simply'});
            memberTarget.roles.remove(mainRole.id);
            memberTarget.roles.add(muteRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been muted❕`);
            return
        }
        memberTarget.roles.remove(mainRole.id);
        memberTarget.roles.add(muteRole.id);
        message.channel.send(new client.MessageEmbed()
        .setColor('#ff9a00')
        .setDescription(`**<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}❕**`)
        .setFooter({
            text: 'Provon | Mute',
            iconURL: message.guild.iconURL()})
      ).then(msg => msg.delete({ timeout: 5000 }));

        setTimeout(function () {
            memberTarget.roles.add(mainRole.id);
            memberTarget.roles.remove(muteRole.id);
        }, ms(args[1]));
    } else {
        message.channel.send(new client.MessageEmbed()
        .setColor('#ff9a00')
        .setDescription('**Cannot find that member**')
        .setFooter({
            text: 'Provon | Mute',
            iconURL: message.guild.iconURL()})
      ).then(msg => msg.delete({ timeout: 5000 }));

    }
    }
}