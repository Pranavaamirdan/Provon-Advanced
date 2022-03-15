const Alarm = require('../../🔎 models/AlarmSchema.js');

module.exports = {
    name: 'alarm',
    aliases: ['a'],
    category: "🎭 Utility",
    usage:'<alarm>a', 
    permissions: ["SEND_MESSAGES"],
    cooldown: 5,
    description: 'when the details of the alarm is sent to the member the time should br written in this format <hour:min am/pm>',
    async execute(Discord, client, message, args, cmd){
            const questions = [
                '> What time do you want your alarm at?',
                '> what days do you want the alarm at? If you want it for everyday, please type `everyday`',
                '> what is the alarm for ?(please answer in one word)'
            ];
    
            let collectCounter = 0;
    
            const filter = m => m.author.id === message.author.id;
            const appStart = await message.author.send(new Discord.MessageEmbed()
            .setColor('#ff9a00')
            .setAuthor({
                name: `| Alarm`,
                iconURL: "https://cdn.discordapp.com/emojis/845227487364775967.gif?v=1"})
            .setDescription(questions[collectCounter++])
            .setFooter('Provon | Alarm'));
    
            const channel = appStart.channel;
    
            const collector = channel.createMessageCollector(filter);
    
            collector.on('collect', () => {
                if (collectCounter < questions.length) {
                    channel.send(new Discord.MessageEmbed()
                    .setAuthor({
                        name: `| Alarm`,
                        iconURL: "https://cdn.discordapp.com/emojis/845227487364775967.gif?v=1"})
                    .setColor('#ff9a00')
                    .setDescription(questions[collectCounter++])
                    .setFooter('Provon | Alarm')
                ) 
                } else {
                    channel.send(`> Your alarm would be set`);
                    collector.stop('fulfilled');
                }
            });

            collector.on('end', async (collected, reason) => {
                if (reason === 'fulfilled') {
                    const mapped = collected.map(msg => {
                        return `${msg.content}`;
                    });
                    
                    let days = [];
                    const t = await mapped[0].split(':');
                    let daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    const name = await mapped[2];
                    const alarmDay = await mapped[1];
                    if(alarmDay.length > 10){
                    const alarmDaySlices = await alarmDay.split(',');
                    for(const alarmDaySlice of alarmDaySlices){
                        await days.push(daysList.find(function findDay(list) {return list == alarmDaySlice;},Array, alarmDaySlice));
                    }
                }
                    if(alarmDay !== "everyday") await days.push(daysList.find(function findDay(list) {return list == alarmDay;},Array,alarmDay));
                    if(alarmDay === "everyday") await days.push(daysList);
                    const alarmDB = await Alarm.findOne({ alarmName : name });
                    if(alarmDB){
                        message.author.send(new Discord.MessageEmbed()
                        .setColor("#2f3136")
                        .setDescription(`\`\`\`css
[There is already Alarm with the name ${name}. Please try again later]
                        \`\`\``)
                        .setFooter('Provon | Alarm'));
                    }else{
                        const a = await Alarm.create({
                            Name : message.author.username,
                            Id : message.author.id,
                            alarmName : name,
                            alarmTime : {
                                days : days,
                                hour : t[0],
                                minute : t[1]
                            }
                        });
                        setTimeout(async () => {
                            const date = new Date();
                            const  alarmDaySlices2 = await a.alarmTime.days;
                            const alarmh = await a.alarmTime.hour;
                            const alarmm = await a.alarmTime.minute;
                            for(const alarmDaySlice2 of alarmDaySlices2){
                                if(/*daysList[date.getDay()] = alarmDaySlice2 && */date.getHours() === alarmh && date.getMinutes() === alarmm){
                                            //if(myDate.getSeconds() === 1){
                                                message.author.send(new Discord.MessageEmbed()
                                                .setDescription(`hello`));
                                            //}
                                }
                            }
                        }, 60000);
                    }
                }
            });
            // function findDay(list) {
            //     return list == alarmDay;
            // }
            // let daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            // let monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


            // let date = myDate.getDate();
            // let month = monthsList[myDate.getMonth()];
            // let year = myDate.getFullYear();
            // let day = daysList[myDate.getDay()];

            // let today = `${day}, ${month} ${date}, ${year}`;

            // let amOrPm;
            // let twelveHours = function (){
            //     if(myDate.getHours() > 12)
            //     {
            //         amOrPm = 'PM';
            //         let twentyFourHourTime = myDate.getHours();
            //         let conversion = twentyFourHourTime - 12;
            //         return `${conversion}`

            //     } else {
            //         amOrPm = 'AM';
            //         return `${myDate.getHours()}`}
            // };
            // let hours = twelveHours();
            // let minutes = myDate.getMinutes();

            // let currentTime = `${hours}:${minutes} ${amOrPm}`;
            //const h = args[0].slice(0,2);
            //const m = args[0].slice(3,6);
            //const aporpm = args[1];
            //message.channel.send(`${h}:${m} ${aporpm}`)
            //if(myDate.getHours)

        // const alarm = await Alarm.create({
        //     Name : message.author.username,
        //     Id : message.author.Id,
        //     alarmName : '',
        //     alarmTime : {
        //         days : '',
        //         hour : '',
        //         minute :''
        //     }
        // })
    }
}