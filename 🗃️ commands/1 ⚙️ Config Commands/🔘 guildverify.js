const GuildConfig = require('../../🔎 models/GuildConfigSchema.js');

module.exports = {
    name: 'guildverify',
    aliases: ['gv'],
    category: "⚙️ Config",
    usage:'<prefix>verification/verify/v', 
    permissions: ["ADMINISTRATOR"],
    cooldown: 5,
    description: 'Sets up a verification system for this server. ✔️ verification channel should be available to everyone',
    async execute(Discord, client, message, args, cmd){
            const guildId = message.guild.id;
            const guildConfigDB = await GuildConfig.findOne({ guildId });
            if(!args[0]){
                const embed = new Discord.MessageEmbed()
                    .setAuthor({
                        name: `${message.author.tag}`,
                        iconURL: message.author.displayAvatarURL()})
                    .setTitle('Verification')
                    .setDescription(`\`\`\`Please mention the the role or it's id\`\`\``)
                    .setColor('#ff9a00')
                message.reply({ embeds: [embed] });
            } else {
            if(guildConfigDB){
                if(guildConfigDB.Verification.verificationState === 'Allowed'){
                    const embed = new Discord.MessageEmbed()
                        .setAuthor({
                            name: `${message.author.tag}`,
                            iconURL: message.author.displayAvatarURL()})    
                        .setTitle('Verification')
                        .setDescription(`\`\`\`The Verification system is already set\`\`\``)
                        .setColor('#ff9a00')
                    message.reply({ embeds: [embed] });
                } else {
                    let verificationRole = message.mentions.roles.first() 
                        || message.guild.roles.cache.get(args[0]) 
                        || message.guild.roles.cache.find(rp => rp.name.toLowerCase() === args.slice(1).join(' ').toLocaleLowerCase()).id;
                        
                    const verificationLogChannel = await message.guild.channels.create('👣👀verification log', {
                        type: 'text',
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL'],
                            }   ]
                        })
                    const verificationChannel = await message.guild.channels.create('🙏 Welcome', {
                        type: 'text',
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL'],
                            },
                            {
                                id : verificationRole ,
                                allow : ['VIEW_CHANNEL']
                            }]
                        }) 
                        const verificationLogChannelyId = verificationLogChannel.id;
                        const verificationChannelId = verificationChannel.id;
                        
                    const VerificationDB = await GuildConfig.findOneAndUpdate(guildId, {
                        Verification: {
                            verificationState : 'Allowed',
                            verificationRole : verificationRole,
                            welcomeChannel : verificationChannelId,
                            verificationLogChannel : verificationLogChannelyId,
                        },
                    })
                    await client.configs.set(guildId, VerificationDB)
                    message.reply(new Discord.MessageEmbed()
                        .setAuthor({
                            name: `${message.author.tag}`,
                            iconURL: message.author.displayAvatarURL()})
                        .setDescription(`\`\`\`✔️ The verification system is set \`\`\``)
                        .setColor('#ff9a00')
                        );
                }
            } else { 
                message.reply(new Discord.MessageEmbed()
                .setAuthor({
                    name: `${message.author.tag}`,
                    iconURL: message.author.displayAvatarURL()})
                .setDescription(`You have not setup your guild configuration. Use \`\`\`(:)setup\`\`\``)
                .setColor('#ff9a00'));
            }
        }
    }
}