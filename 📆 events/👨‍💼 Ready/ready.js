const { MessageButton, MessageActionRow } = require("discord.js");
const fs = require('fs');
require('dotenv').config();

module.exports = async (Discord, client, message) => {
    console.log(`✔️ ${client.user.username}`)
    let guildCache = await client.guilds.cache.size;
    let channelCache = await client.channels.cache.size;
    let userCache = await client.users.cache.size;
    let tagCache = await client.user.tag;

    const arrayOfStatus = [
        `In ${guildCache} Servers 🗃️`,
        `Watching ${channelCache} Channels 📁`,
        `Helping ${userCache} Users 👨`,
        `${tagCache} Discord Bot 🤖`,
        `.hd for Documentation`
    ]

    let index = 0;
    setInterval(async () => {
        if(index === arrayOfStatus.length) index = 0;
        const status = await arrayOfStatus[index];
        
        await client.user.setPresence({
            status: "online",
        });

        await client.user.setActivity(status, { type: "WATCHING" })

        index++;
    },5000);
}
