const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv').config();
const config = require('../provon.json');
const fs = require('fs');


module.exports = (client, Discord) => {
    client.once("ready", () => {
        const commands = [];

        fs.readdirSync('./🗃️ slash-commands/').forEach(dir => {
            const command_files = fs.readdirSync(`./🗃️ slash-commands/${dir}`).filter(files => files.endsWith('.js'));
            for (const file of command_files) {
                const command = require(`../🗃️ slash-commands/${dir}/${file}`);
                commands.push(command.data.toJSON());
                client.slashCommands.set(command.data.name, command);
            }
        })
        //const rest = new REST({ version: '9' }).setToken(process.env.token);
        const rest = new REST({ version: '9' }).setToken(config.token);


        const clientId = client.user.id ;

        (async () => {
            try {
                await rest.put(
                    Routes.applicationCommands(clientId),
                    { body: commands },
                );
            } catch (error) {
                console.error(error);
            }
        })();
    })
}