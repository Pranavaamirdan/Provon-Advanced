const Discord = require('discord.js');
const settings = require('./provon.json');

const { mongooseConnect } = require("./📌 utilities/mongoose.js");
const { namePrint } = require("./📌 utilities/name.js");
const { registerHandler } = require("./📌 utilities/handler.js");
require('discord-reply');

namePrint();

const client = require("./📌 utilities/client.js");

(async () => {
  await mongooseConnect(settings.MONGODB_URI);
    
  await registerHandler('./🗂️ handlers', client, Discord)
  
  await client.login(settings.token);

  await require("./📌 utilities/configs.js") (client);
  
})();
/*
module.exports = {
    name: 'help',
    aliases: ['h'],
    category: "info",
    usage:'', 
    permissions: ["SEND_MESSAGES"],
    cooldown: 5,
    description: 'helps with the command',
    async execute(Discord, client, message, args, cmd){
        
    }
}
*/
