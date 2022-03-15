const Note = require('../../🔎 models/NoteSchema.js');

module.exports = {
    name: 'createnote',
    aliases: ['cn'],
    category: ":performing_arts: Utility",
    usage:'<prefix>createnote/cn', 
    permissions: ["SEND_MESSAGES"],
    cooldown: 5,
    description: 'Creates a note',
    async execute(Discord, client, message, args, cmd){
        const index = message.content.indexOf(' ');
        const description = message.content.slice(index + 1)
        try {
            message.delete()
            await Note.create({
            description,
            userId : message.author.id
            })
            //const id = await Note.Objectid
            message.channel.send(`<@${message.author.id}>, Note saved.`)
            //message.author.send(`Hello <@${message.author.id}>,\`\`\`${id}\`\`\``)
        } catch (err) {
            console.log(err);
            message.channel.send(`<@${message.author.id}>, Failed to save note.`)
        }
    }
}