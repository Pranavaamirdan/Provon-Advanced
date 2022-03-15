const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote } = require('@discordjs/builders');

module.exports = {
    name: 'clear',
    aliases: ['c'],
    category: "🔧 Moderation",
    usage:`<prefix>c all/<number>`,
    permissions: ["ADMINISTRATOR"],
    cooldown: 5,
    description: 'clears all/particular messages',
    async execute(Discord, client, message, args, cmd){
        try{
            //await message.delete({ timeout: 10, reason: 'simply' });
            if (!args[0]) {
                const noNumber = new Discord.MessageEmbed()
                    .setColor('#ff9a00')
                    .setDescription(bold('Please specify the number of messages you want to clear!📄'))
                    .setFooter({
                        text: 'Provon | Clear',
                        iconURL: message.guild.iconURL()
                    });

                await message.reply({ embeds: [noNumber] }).then(m => setTimeout(() => m.delete(), 5000));
            } else if (args[0] === "all") {
                await message.channel.messages.fetch().then(async messages => {
                    message.channel.bulkDelete(messages);
                    
                    const allClear = new Discord.MessageEmbed()
                        .setColor('#ff9a00')
                        .setDescription(bold(`Successfully deleted \`${messages.size}\` messages`))
                        .setFooter({
                            text: 'Provon | Clear',
                            iconURL: message.guild.iconURL()
                        });
                    
                    await message.reply({ embeds: [allClear] }).then(m => setTimeout(() => m.delete(), 5000));
                });
            } else if (args[0]) {
                if (isNaN(args[0])) {
                    const notRealNumber = new Discord.MessageEmbed()
                        .setColor('#ff9a00')
                        .setDescription(bold('Please mesage a real number❕ ♾'))
                        .setFooter({
                            text: 'Provon | Clear',
                            iconURL: message.guild.iconURL()
                        });

                    await message.reply({ embeds: [notRealNumber] }).then(m => setTimeout(() => m.delete(), 5000));;
                }
        
                
                if (args[0] > 100) {
                    const moreThanHundred = new Discord.MessageEmbed()
                        .setColor('#ff9a00')
                        .setDescription(bold('You cannot delete messages more 100 ❕'))
                        .setFooter({
                            text: 'Provon | Clear',
                            iconURL: message.guild.iconURL()});

                    await message.reply({ embeds: [moreThanHundred] }).then(m => setTimeout(() => m.delete(), 5000));;
                }
                
                
                if (args[0] < 1) { 
                    const lessThanOne = new Discord.MessageEmbed()
                        .setColor('#ff9a00')
                        .setDescription(bold('You cannot delete messages lesser than 1 ❕'))
                        .setFooter({
                            text: 'Provon | Clear',
                            iconURL: message.guild.iconURL()});

                    await message.reply({ embeds: [lessThanOne] }).then(m => setTimeout(() => m.delete(), 5000));;
                }    
                
                await message.channel.messages.fetch({ limit: args[0] }).then(async msgs => {
                        
                    await message.channel.bulkDelete(msgs); 
                    const success = new Discord.MessageEmbed()
                        .setColor('#ff9a00')
                        .setDescription(bold(`Successfully deleted \`${msgs.size}/${args[0]}\` messages`))
                        .setFooter({
                            text: 'Provon | Clear',
                            iconURL: message.guild.iconURL()});

                    await message.channel.send({ embeds: [success] }).then(m => setTimeout(() => m.delete(), 5000));;
                });
                
            }
        } catch(error) {
            console.log(error);
        } 
    }
}