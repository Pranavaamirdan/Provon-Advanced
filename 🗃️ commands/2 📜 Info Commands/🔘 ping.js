// const quick = require('quick.db');
const { MessageEmbed } = require('discord.js');
const prefix = process.env.prefix;

module.exports = {
    name: 'ping',
    aliases: ['p'],
    category: "📜 Info",
    usage:`${prefix}ping/p`,
    permissions: ["SEND_MESSAGES"],
    cooldown: 5,
    description: 'Gets the ping of the Bot',
    async execute(Discord, client, message, args, cmd){
        const messagePing = Date.now(); // start before message sent
        const endMessagePing = Date.now() - messagePing; // end of message sent
    
        const embed = new MessageEmbed() // build message embed
          .setDescription(`> Database ping data:
            Message ping: \`${endMessagePing}ms\`
            Client ping: \`${client.ws.ping}\`
          `
          )
          .setColor('#ff9a00')
          .setTimestamp();
    
        message.reply({
          embeds: [embed]
        }); // edit message content
    }
}

// async function getDBPingData() {
//     // get the fetch data ping
//     const startGet = Date.now();
//     await quick.get('QR=.');
//     const endGet = Date.now() - startGet;
  
//     // get the wright data ping
//     const startWright = Date.now();
//     await quick.set('QR=.', Buffer.from(startWright.toString()).toString('base64'));
//     const endWright = Date.now() - startWright;
  
//     // avrage ping time
//     const avarage = (endGet + endWright) / 2;
//     try {
//       quick.delete('QR=.'); // try deleteing
//     } catch (error) {}
//     return { endGet, endWright, avarage }; // return the ping data
//   }