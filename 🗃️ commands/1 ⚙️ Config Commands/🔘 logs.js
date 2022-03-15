const GuildConfig = require('../../🔎 models/GuildConfigSchema.js');

module.exports = {
    name: 'logs',
    aliases: ['l','aio'],
    category: "⚙️ Config",
    usage:'<prefix>logs/l/aio', 
    permissions: ["ADMINISTRATOR"],
    cooldown: 5,
    description: 'Sets up logs for the server',
    async execute(Discord, client, message, args, cmd){
    const guildId = message.guild.id;
    const g = await GuildConfig.findOneAndUpdate({ guildId: guildId });
    const result = "Not set"
    if(!g){
        const setup = new Discord.MessageEmbed()
            .setAuthor({
                name: `${message.author.tag}`,
                iconURL: message.author.displayAvatarURL()})    
            .setDescription(`\`\`\`Please use <prefix>setup so as to create a config for this server\`\`\``)
            .setColor('#ff9a00')
            
        message.reply({ embeds: [setup] }); 
    } else {
            if (g.Logs.logState !== result) {
                const reply = new Discord.MessageEmbed()
                .setAuthor({
                    name: `${message.author.tag}`,
                    iconURL: message.author.displayAvatarURL()})    
                .setDescription(`\`\`\`✔️ Logs are already set\`\`\``)
                .setColor('#ff9a00')
                
                message.reply({ embeds: [reply] });
            } else if (g.Logs.logState === result) {
            try{
                const setting = new Discord.MessageEmbed()
                .setAuthor({
                    name: `${message.author.tag}`,
                    iconURL: message.author.displayAvatarURL()})    
                .setDescription(`\`\`\`✔️ Logs are being set. This may take some time\`\`\``)
                .setColor('#ff9a00')
                
                message.reply({ embeds: [setting] });

                const category = await message.guild.channels.create('Provon Logs', {
                    type: 'GUILD_CATEGORY',
                    position: 100,
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            deny: ['VIEW_CHANNEL'],
                        }]
                }).then(async cat =>  {
                const serverLogChannel = await message.guild.channels.create('👣👀server log', {
                        type: 'text',
                        parent: cat,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL'],
                            }]
                        })

                const joinLeaveLogChannel =  await message.guild.channels.create('👣👀join leave log', {
                    type: 'text',
                    parent: cat,
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            deny: ['VIEW_CHANNEL'],
                        }]
                        })

                const memberLogChannel =  await message.guild.channels.create('👣👀member log', {
                    type: 'text',
                    parent: cat,
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            deny: ['VIEW_CHANNEL'],
                        }]
                        })

                const messageLogChannel =  await message.guild.channels.create('👣👀message log', {
                    type: 'text',
                    parent: cat,
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            deny: ['VIEW_CHANNEL'],
                        }]
                        })

                const voiceLogChannel =  await message.guild.channels.create('👣👀voice log', {
                    type: 'text',
                    parent: cat,
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            deny: ['VIEW_CHANNEL'],
                        }]
                        })

                        const logCategoryId = cat.id;
                        const serverLogChannelId = serverLogChannel.id;
                        const joinLeaveLogChannelId = joinLeaveLogChannel.id;
                        const memberLogChannelId = memberLogChannel.id;
                        const messageLogChannelId = messageLogChannel.id;
                        const voiceLogChannelId = voiceLogChannel.id;
                        // await console.log(logCategoryId);
                        // await console.log(serverLogChannelId);
                        // await console.log(joinLeaveLogChannelId);
                        // await console.log(memberLogChannelId);
                        // await console.log(messageLogChannelId);
                        // await console.log(voiceLogChannelId);
                        //GuildConfig.pre('findOneAndUpdate', function (runUpdate) {
                    //});
                async function runUpdate(GuildConfig) {
                        const guildConfigDB = await GuildConfig.findOneAndUpdate(guildId, {
                            Logs : {
                                logState : "set",
                                logCategory : logCategoryId,
                                serverLogChannel : serverLogChannelId ,
                                joinLeaveLogChannel : joinLeaveLogChannelId ,
                                memberLogChannel : memberLogChannelId ,
                                messageLogChannel : messageLogChannelId ,
                                voiceLogChannel : voiceLogChannelId ,
                            },
                            new : true 
                        }, GuildConfig)
                            .then((result) => {
                                // console.log(result);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                            client.configs.set( guildId, guildConfigDB);
                }
                    runUpdate(GuildConfig);
                    
                }).catch((err) => {
                console.log(err);
                })
            }catch(err){
                console.log(err);
            }

            console.log('Logs are set');
            }
        }
    }
}