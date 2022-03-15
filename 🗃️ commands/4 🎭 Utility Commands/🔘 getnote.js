const Note = require('../../🔎 models/NoteSchema.js')

module.exports = {
    name: 'getnote',
    aliases: ['gn'],
    category: "🎭 Utility",
    usage:'<prefix>getnote/gn', 
    permissions: ["SEND_MESSAGES"],
    cooldown: 5,
    description: 'Gets a note which was saves by the member',
    async execute(Discord, client, message, args, cmd){
        const NoteEmbedChannel = new Discord.MessageEmbed()
        .setAuthor({
            name: `${client.user.username}`,
            iconURL: client.user.displayAvatarURL()})
        .setTitle(`\`\`\`—————————————Notes—————————————\`\`\``)
        .setDescription(`\`⭕ The note will be sent to your dm\``)
        .setColor("#ff9a00");
        message.lineReplyNoMention(NoteEmbedChannel);

    if(!args[0]){
        const notes = await Note.find({ userId : message.author.id },
        null, {
            limit : 5,
            //skip : 3
        })
        //console.log(notes)
        //message.channel.send(`<@${message.author.id}>, ${notes[0].description}`, )
        let description = '';
        for(const i in notes){
        description += `${parseInt(i) + 1}) ${notes[i].description}\n`
        } 
        const NoteEmbedDm = new Discord.MessageEmbed()
        .setAuthor({
            name: `${client.user.username}`,
            iconURL: client.user.displayAvatarURL()})
        .setTitle(`——————————Notes——————————`)
        .setDescription(`\`\`\`${description}\`\`\``)
        .setColor("#ff9a00");
        message.author.send(NoteEmbedDm);
    }else{
        const arg = args[0];
        const note = await Note.findById(arg);
        try {  
        if(note){
        message.channel.send(`<@${message.author.id}>
    ${note.description}`)
        }
        } catch (error) {
        console.log(error)
        message.channel.send(`<@${message.author.id}>, cannot find note`);
        }
        }
    }
}