const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: "helpdocs",
    aliases: ["hd"],
    category: "π Info",
    usage: `<prefix>helpdocument/hp`,
    permissions: ["SEND_MESSAGES"],
    cooldown: 5,
    description: "helps with the command",
    async execute(Discord, client, message, args, cmd) {
        message.delete();
        const guildId = await message.guild.id;
        const { prefix }  = client.configs.get(guildId);
        try{
            const commands = client.commands.map((command) =>
                new Discord.MessageEmbed()
                    .setAuthor({
                    name: `${client.user.username}`,
                    iconURL: client.user.displayAvatarURL()})
                    .setTitle("```βοΈ Command Information```")
                    .setDescription(`> **β­Bot Prefix**:\n> \`${prefix}\``)
                    .addField(`> **\β­ Command Name:**`, `> \`${command.name}\``, true)
                    .addField(`> **\β­ Command Aliases:**`, `> \`${command.aliases}\``, true)
                    .addField(`> **\β­ Command Category:**`, `> \`${command.category}\``, true)
                    .addField(`> **\β­ Command Usage:**`, `> \`${command.usage}\``, true)
                    .addField(
                    `> **\β­ Command Permissions:**`,
                    `> \`${command.permissions}\``,
                    true
                    )
                    .addField(`> **\β­ Command Cooldown:**`, `> \`${command.cooldown}\``, true)
                    .addField(
                    `> **\β­ Command Description:**`,
                    `> \`${command.description}\``,
                    true
                    )
                    .setColor("#2f3136")
            );
            const embed = new Discord.MessageEmbed()
                .setAuthor({
                    name: `${client.user.username}`,
                    iconURL: client.user.displayAvatarURL()})
                .setTitle("βββββββββββDocmentationβββββββββββ")
                .setDescription(`> \`\`\`This is a Documentation for my Commands\`\`\``)
                .addField(`> \`Do you want to send the document in the Server or Dm β\``,`βββββββββββββββββββββββββββββββββ`)
                .setColor("#2f3136");

            let list = new MessageActionRow().addComponents(
                new MessageButton()
                    .setStyle("SUCCESS")
                    .setLabel("Server")
                    .setCustomId("server"),
                new MessageButton()
                    .setStyle("SUCCESS")
                    .setLabel("Dm")
                    .setCustomId("dm"),
                new MessageButton()
                    .setStyle("DANGER")
                    .setLabel("None")
                    .setCustomId("none"));

            message.channel.send({
                components: [list],
                embeds: [embed] 
        })
        .then(async (m) => {
            const time = 60_000;
            const filter = (reaction, user) => user.id === message.author.id; // To Check If User Who Clicked Button Is Same As Who Used Command
            const collector = m.createReactionCollector({ filter , time: time }); // 30 Seconds To Click

            collector.on("collect", async (b) => {
                b.deferUpdate();
                if (b.customId  === "server") {
                    m.delete();
                    let pageNumber = 0;
                    const command = commands[pageNumber];
                    const pageEmbed = new Discord.MessageEmbed()
                        .setTitle(`> \`\`\`Current Page : ${pageNumber + 1}/${commands.length}\`\`\``)
                        .setColor("#2f3136");

                    const msp = await message.channel.send({ embeds: pageEmbed });
                    const msc = await message.channel.send({ embeds: command }).then(async (react) => {
                    react.react('β¬οΈ')
                    react.react('β‘οΈ')
                    });
                    
                    const filter = (reaction, user) => ['β¬οΈ','β‘οΈ'].includes(reaction.emoji.name) && (message.author.id === user.id);
                    const rcollector = msc.createReactionCollector({ filter });
                    rcollector.on("collect", async (reaction, user) => {
                        if(reaction.emoji.name === 'β‘οΈ'){
                            reaction.users.remove(user)
                            if(pageNumber < commands.length - 1){
                                pageNumber++;
                                const e1 = new Discord.MessageEmbed()
                                .setTitle(`> \`\`\`Current Page : ${pageNumber + 1}/${commands.length}\`\`\``)
                                .setColor("#2f3136");
                                const arrayp = []
                                arrayp.push(e1)
                                msp.edit(arrayp);
                                const arrayc = [];
                                arrayc.push(commands[pageNumber])
                                msc.edit(arrayc);
                            }
                        } else if (reaction.emoji.name === 'β¬οΈ'){
                            reaction.users.remove(user)
                            if(pageNumber !== 0){
                                --pageNumber;
                                const e1 = new Discord.MessageEmbed()
                                .setTitle(`> \`\`\`Current Page : ${pageNumber + 1}/${commands.length}\`\`\``)
                                .setColor("#2f3136");
                                const arrayp = []
                                arrayp.push(e1)
                                msp.edit(arrayp);
                                const arrayc = [];
                                arrayc.push(commands[pageNumber])
                                msc.edit(arrayc);
                            }
                        }
                    //}
                    });

                    rcollector.on("end", async () => {
                        const endEmbed = new Discord.MessageEmbed()
                        .setTitle(`ββββββββββDocmentationββββββββββ`)
                        .setDescription(`> \`\`\`Thank You looking through my Documentation β\`\`\``)
                        .addField('β­β­β­β­β­β­β­β­β­β­β­β­β­β­β­β­β­β­β­β­β­','ββββββββββββββββββββββββββββββ')
                        .setThumbnail(client.user.displayAvatarURL())
                        .setColor("#2f3136");
                        msc.edit(endEmbed)
                    })
                    collector.stop();
                } 

                if(b.customId  === 'dm'){
                    m.delete()
                    let pageNumber = 0;
                    const command = commands[pageNumber];
                    const pageEmbed = new Discord.MessageEmbed()
                        .setTitle(`> \`\`\`Current Page : ${pageNumber + 1}/${commands.length}\`\`\``)
                        .setColor("#2f3136");
                    const msp = await message.author.send(pageEmbed);
                    const msc = await message.author.send(command);
                    await msc.react('β¬οΈ');
                    await msc.react('β‘οΈ');
                    
                    const filter = (reaction, user) => ['β¬οΈ','β‘οΈ'].includes(reaction.emoji.name) && (message.author.id === user.id);
                    const rcollector = msc.createReactionCollector({filter})
                    rcollector.on("collect", async (reaction, user) => {
                        //for(const r in reaction){
                        if(reaction.emoji.name === 'β‘οΈ'){
                            reaction.users.remove(user)
                            if(pageNumber < commands.length - 1){
                                pageNumber++;
                                const e1 = new Discord.MessageEmbed()
                                .setTitle(`> \`\`\`Current Page : ${pageNumber + 1}/${commands.length}\`\`\``)
                                .setColor("#2f3136");
                                const arrayp = []
                                arrayp.push(e1)
                                msp.edit(arrayp);
                                const arrayc = [];
                                arrayc.push(commands[pageNumber])
                                msc.edit(arrayc);
                            }
                        } else if (reaction.emoji.name === 'β¬οΈ'){
                            reaction.users.remove(user)
                            if(pageNumber !== 0){
                                --pageNumber;
                                const e1 = new Discord.MessageEmbed()
                                .setTitle(`> \`\`\`Current Page : ${pageNumber + 1}/${commands.length}\`\`\``)
                                .setColor("#2f3136");
                                const arrayp = []
                                arrayp.push(e1)
                                msp.edit(arrayp);
                                const arrayc = [];
                                arrayc.push(commands[pageNumber])
                                msc.edit(arrayc);
                            }
                        }
                    //}
                    });

                    rcollector.on("end", async () => {
                        const endEmbed = new Discord.MessageEmbed()
                        .setTitle(`βββββββββββDocmentationβββββββββββ`)
                        .setDescription(`> \`\`\`Thank You looking through my Documentation β\`\`\``)
                        .addField('β­β­β­β­β­β­β­β­β­β­β­β­β­β­β­β­β­β­β­β­β­β­β­β­β­','βββββββββββββββββββββββββββββββββ')
                        .setThumbnail(client.user.displayAvatarURL())
                        .setColor("#2f3136");

                        msc.edit(endEmbed)
                    })
                    collector.stop();
                }
                if (b.customId  === "none") {
                    const endEmbed = new Discord.MessageEmbed()
                    .setTitle()
                    .setDescription(`βββββββββββDocmentationβββββββββββ`)
                    .addField('> \`Please do visit the Documentation later\`','ββββββββββββββββββββββββββββββ')
                    .setThumbnail(client.user.displayAvatarURL())
                    .setColor("#2f3136");
                    message.channel.send(endEmbed);

                    collector.stop();
                }
            });
        })
        .catch((err) => console.log(err));
        } catch (err) {
            console.log(err);
        }
    }
};
