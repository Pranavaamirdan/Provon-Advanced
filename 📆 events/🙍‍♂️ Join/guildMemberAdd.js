const GuildConfig = require('../../🔎 models/GuildConfigSchema.js');
const moment = require("moment");

const createCaptcha = require('./captcha.js');
const fs = require('fs').promises;


module.exports =  async (Discord, client, member) => {
    console.log(`${member.user.username} joined the server ${member.guild.name} and the owner is ${member.guild.owner.user.username}`);
    const guildId = member.guild.id;
    const guildfetch = await GuildConfig.findOne({ guildId : guildId });
        if(guildfetch){
            if(guildfetch.Verification.verificationState === 'Allowed'){
                const captcha = await createCaptcha();
                    try {
                    const img = new Discord.MessageAttachment( `${__dirname}/captchas/${captcha}.png`, `${captcha}.png`);
                    
                    const captchaEmbed = new Discord.MessageEmbed()
                    .setColor('#ff9a00')
                    .setAuthor(client.user.username, `https://cdn.discordapp.com/emojis/845227487364775967.gif?v=1`)
                    .setTitle(`**\`\`\`✔️ | Captcha \`\`\`**`) 
                    .attachFiles(img)
                    .setImage(`attachment://${captcha}.png`)
                    .setDescription(`\`Please enter the following charaters in 60 seconds ⏱️\``)
                    .setFooter('Provon | Captcha')
                
                    const msg = await member.send(captchaEmbed).catch((err) => { console.log(err) });
                
                    try {
                        const filter = m => {
                            if(m.author.bot) return;
                            if(m.author.id === member.id && m.content === captcha) return true;
                            else {
                                const incorrectEmbed = new Discord.MessageEmbed()
                            .setColor('#ff9a00')
                            .setTitle(`**\`\`\`❌ | Captcha \`\`\`**`)
                            .setDescription(`**You entered the captcha incorrectly ❕**`)
                                m.channel.send(incorrectEmbed);
                                return false;
                            }
                        };
                        const response = await msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time']});
                        if(response) {
                            const verifiedEmbed = new Discord.MessageEmbed()
                            .setColor('#ff9a00')
                            .setTitle(`**\`\`\`✔️ | Captcha \`\`\`**`)
                            .setDescription(`**You have verified yourself ❕**`)
                            
                            await msg.channel.send(verifiedEmbed);
                            await member.roles.add(guildfetch.Verification.verificationRole);
                          
                        const verifylog = await member.guild.channels.cache.get(guildfetch.Verification.verificationLogChannel);
                        const embed1 = new Discord.MessageEmbed()
                        .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
                        .setTitle(`\`✔️ Verification\``)
                        .setDescription(`\`Joined the server\``)
                        .addField(`**\`🎫 Captcha\`**`,`${captcha}`,true)
                        .addField(`**\`✏️ Given\`**`,`${captcha}`,true)
                        .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
                        verifylog.send(embed1);
                        const welcomeChannel = await member.guild.channels.cache.get(guildfetch.Verification.welcomeChannel);
                        const welcomeEmbed = new Discord.MessageEmbed()
                        .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
                        .setTitle(`\`🙏 Welcome\``)
                        .setDescription(`\`Welcome to the ${member.guild.name}\``)
                        //.addField(`**\`🎫 Captcha\`**`,`${captcha}`,true)
                        //.addField(`**\`✏️ Given\`**`,`${captcha}`,true)
                        .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
                        welcomeChannel.send(welcomeEmbed);


                            await fs.unlink(`${__dirname}/captchas/${captcha}.png`)
                                .catch(err => console.log(err));
                        }
                }
                catch(err) {
                    console.log(err);
                    await msg.channel.send('You did not solve the captcha correctly on time.');
                    await member.kick();
                    await fs.unlink(`${__dirname}/captchas/${captcha}.png`)
                            .catch(err => console.log(err));
                }
            }
            catch(err) {
                console.log(err);
            }
        }
        if(guildfetch.Logs.logState === 'set'){
        let stat = {
            online: "https://emoji.gg/assets/emoji/9166_online.png",
            idle: "https://emoji.gg/assets/emoji/3929_idle.png",
            dnd: "https://emoji.gg/assets/emoji/2531_dnd.png",
            offline: "https://emoji.gg/assets/emoji/7445_status_offline.png"
          }
      
          //NOW BADGES
          let badges = await member.user.flags
          badges = await badges.toArray();
      
          let newbadges = [];
          badges.forEach(m => {
            newbadges.push(m.replace("_", " "))
          })
      
          let embed = new Discord.MessageEmbed()
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      
          //ACTIVITY
          let array = []
          if (member.user.presence.activities.length) {
      
            let data = member.user.presence.activities;
      
            for (let i = 0; i < data.length; i++) {
              let name = data[i].name || "None"
              let xname = data[i].details || "None"
              let zname = data[i].state || "None"
              let type = data[i].type
      
              array.push(`**${type}** : \`${name} : ${xname} : ${zname}\``)
      
              embed.setDescription(array.join("\n"))
      
            }
          }
      
            embed.setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
            embed.setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
            embed.addField("Joined At", moment(member.user.joinedAt).format("LLLL"))
              .addField("Account Created At", moment(member.user.createdAt).format("LLLL"))
              .addField("Common Information", `ID: \`${member.user.id}\`\nDiscriminator: #${member.user.discriminator}`)
              .addField("Badges", newbadges.join(", ").toLowerCase() || "None")
              .setFooter(member.user.presence.status, stat[member.user.presence.status])

            const log = await member.guild.channels.cache.get(guildfetch.Logs.joinLeaveLogChannel)
            log.send(embed);
        }
    }
}