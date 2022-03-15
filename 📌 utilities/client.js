const Discord = require('discord.js');

const client = new Discord.Client({
     messageCacheLifetime: 60,
     messageCacheMaxSize: 10,
     restTimeOffset: 0,
     restWsBridgetimeout: 100,
     partials: ["MESSAGE", "CHANNEL", "REACTION"],
     intents: [
          Discord.Intents.FLAGS.GUILDS,
          Discord.Intents.FLAGS.GUILD_MESSAGES,
          Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
          Discord.Intents.FLAGS.GUILD_INVITES,
     ],
     allowedMentions: { parse: ['users','roles'], repliedUser: true }
});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.configs = new Discord.Collection();


module.exports = client;