const GuildConfig = require('../../🔎 models/GuildConfigSchema.js');
const moment = require("moment");

module.exports =  async (Discord, client, member) => {
    const guildId = member.guild.id;
    const guildfetch = await GuildConfig.findOne({ guildId : guildId })
    if(guildfetch){
        if(guildfetch.Verification.verificationState === 'Allowed'){
            const captchaEmbed = new Discord.MessageEmbed()
                .setColor('#ff9a00')
                .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                .setTitle(`**\`\`\`✔️ | Member\`\`\`**`) 
                .setDescription(`Thank you for staying in ${member.guild.name}`)
                .setFooter('Provon | Leave')

            const msg = await member.send(captchaEmbed).catch((err) => { console.log(err) });
        }
        if(guildfetch.Logs.logState === 'set'){
            var myDate = new Date();

            let daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


            let date = myDate.getDate();
            let month = monthsList[myDate.getMonth()];
            let year = myDate.getFullYear();
            let day = daysList[myDate.getDay()];

            let today = `${day}, ${month} ${date}, ${year}`;

            let amOrPm;
            let twelveHours = function (){
                if(myDate.getHours() > 12)
                {
                    amOrPm = 'PM';
                    let twentyFourHourTime = myDate.getHours();
                    let conversion = twentyFourHourTime - 12;
                    return `${conversion}`

                } else {
                    amOrPm = 'AM';
                    return `${myDate.getHours()}`}
            };
            let hours = twelveHours();
            let minutes = myDate.getMinutes();

            let currentTime = `${hours}:${minutes} ${amOrPm}`;

                        //var time = date.today();//today.getDay() + " " + today.getHours() + ":" + today.getMinutes();
                        const embed = new Discord.MessageEmbed()
                        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                        .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
                        .setDescription(`\`Left the server\``)
                        .addField("\`Joined At\`", moment(member.user.joinedAt).format("LLLL"))
                        .addField("\`Left at\`", today + ' ' + currentTime)
                        .addField("\`Common Information\`", `ID: \`${member.user.id}\`\nDiscriminator: #${member.user.discriminator}`)
                        .setColor('RED')
                        const log = await member.guild.channels.cache.get(guildfetch.Logs.joinLeaveLogChannel)
                        log.send(embed);
        }
    }
}