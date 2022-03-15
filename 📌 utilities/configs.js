const GuildConfig = require(`../🔎 models/GuildConfigSchema.js`);
const settings = require('../provon.json');

module.exports = async (client) => {
    await client.guilds.cache.forEach(async guild => {
        const guildID = guild.id;
        const guildConfigDb = await GuildConfig.findOne({ guildId : guildID });
              
        if(guildConfigDb){
            await client.configs.set(guildID, guildConfigDb)
        } else {
            await client.configs.set(guildID,{
                guildId : guildID,
                prefix : settings.prefix
            });
        }
    });
}