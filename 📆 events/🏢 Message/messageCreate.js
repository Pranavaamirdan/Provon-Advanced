const cooldowns = new Map();
const User = require('../../🔎 models/UserSchema.js');
const { permissionsChecker } = require("../../📌 command-utilities/permissions.js");
const { cooldownsChecker } = require("../../📌 command-utilities/cooldowns.js");


module.exports = async (Discord, client, message) => {
    if (message.author.bot || !message.guild) return;
    if (message.content.includes("@here") || message.content.includes("@everyone")) return false;
    
    let guildID;
    if (message.guild) guildID = message.guild.id;
  
    const userFind = await User.findOne({
        Id : guildID
    })
    if(!message.author.bot){
        if(!userFind){
            await User.create({
                Name : message.author.username,
                Id : guildID
            })
        }
    }
    
    const { prefix } = await client.configs.get(guildID);
    const mentions = await message.mentions.has(client.user.id);

    if (message.content.startsWith(prefix) || !message.author.bot){
        const args = message.content.slice(prefix.length).split(/ +/);
        const cmd = args.shift().toLowerCase();

        const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

        if(command){
            const validPermissions = [
                "ADD_REACTIONS",
                "ADMINISTRATOR",
                "ATTACH_FILES",
                "BAN_MEMBERS",
                "CHANGE_NICKNAME",
                "CONNECT",
                "CREATE_INSTANT_INVITE",
                "CREATE_PRIVATE_THREADS",
                "CREATE_PUBLIC_THREADS",
                "DEAFEN_MEMBERS",
                "EMBED_LINKS",
                "KICK_MEMBERS",
                "MANAGE_CHANNELS",
                "MANAGE_EMOJIS_AND_STICKERS",
                "MANAGE_EVENTS",
                "MANAGE_GUILD",
                "MANAGE_MESSAGES",
                "MANAGE_NICKNAMES",
                "MANAGE_ROLES",
                "MANAGE_THREADS",
                "MANAGE_WEBHOOKS",
                "MENTION_EVERYONE",
                "MODERATE_MEMBERS",
                "MOVE_MEMBERS",
                "MUTE_MEMBERS",
                "PRIORITY_SPEAKER",
                "READ_MESSAGE_HISTORY",
                "REQUEST_TO_SPEAK",
                "SEND_MESSAGES",
                "SEND_MESSAGES_IN_THREADS",
                "SEND_TTS_MESSAGES",
                "SPEAK",
                "START_EMBEDDED_ACTIVITIES",
                "STREAM",
                "USE_APPLICATION_COMMANDS",
                "USE_EXTERNAL_EMOJIS",
                "USE_EXTERNAL_STICKERS",
                "USE_PRIVATE_THREADS",
                "USE_PUBLIC_THREADS",
                "USE_VAD",
                "VIEW_AUDIT_LOG",
                "VIEW_CHANNEL",
                "VIEW_GUILD_INSIGHTS",
            ]
            
            if(command.permissions.length){
                let invalidPerms = []
                for(const perm of command.permissions){
                    if(!validPermissions.includes(perm)){
                        return console.log(`Invalid Permissions ${perm}`);
                    }
                    if(!message.member.permissions.has(perm)){
                        invalidPerms.push(perm);
                    }
                }
                if (invalidPerms.length){
                    return message.channel.send(`Missing Permissions: \`${invalidPerms}\``);
                }
            }

            //await permissionsChecker(Discord, message, command);
            
            if(!cooldowns.has(command.name)){
                cooldowns.set(command.name, new Discord.Collection());
            }
        
            const current_time = Date.now();
            const time_stamps = cooldowns.get(command.name);
            const cooldown_amount = (command.cooldown) * 1000;
        
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
            
                    return message.reply({ embeds: [ cool_Embed ] }).then(m => m.delete({ timeout: 5000 }));
                }
            }
        
            time_stamps.set(message.author.id, current_time);
            setTimeout(() => time_stamps.delete(message.author.id), 5000);

            //await cooldownsChecker(Discord, client, message, command);

            try {
                command.execute(Discord, client, message, args, cmd)
                console.log(`${prefix}${command.name} was executed in ${message.guild.name} and the Id : ${message.guild.id}`)
            } catch (err) {
                message.reply("**There was an error trying to execute this command ❕**");
                console.log(err);
            }
        } else if(message.content.startsWith(prefix) && !command){
            message.delete()
            
            const embed = new Discord.MessageEmbed()
                .setAuthor({
                    name: `${client.user.username}`,
                    iconURL: 'https://cdn.discordapp.com/emojis/845319864901959701.gif?v=1'})
                .setColor('#ff9a00')
                .setTitle(`————————————Command————————————`)
                .setDescription('**Warning**')
                .addField(`❌ There is no command named ${cmd}`,`—————————————————————————————————`)
                .setFooter({
                    text: 'Provon | Commands',
                    iconURL: 'https://cdn.discordapp.com/emojis/845319864901959701.gif?v=1'
                });

            return message.channel.send({ embeds:[embed] }).then(m => m.delete({ timeout: 10000 }));
        } 
    } else if (mentions) {
        const mention = new Discord.MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setColor('#ff9a00')
            .setTitle(`\`\`\`${message.author.username} Heyy there ❕\`\`\``)
            .setDescription(`> I am ${client.user.username}, A bot in your server.\nMy prefix is ${prefix} for this server.`)
            .addField(`You may change it by seeing my Documentation.`,`> use \`${prefix}helpdocs\``)
            
        return message.reply({ embeds: [mention] })
    };
}