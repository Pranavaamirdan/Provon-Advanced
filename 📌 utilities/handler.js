const fs = require('fs');

async function registerHandler(folder = '', client, Discord) {
    await fs.readdirSync(`./${folder}`).forEach(handler => {
        require(`../${folder}/${handler}`)(client, Discord)
    });
} 

module.exports = { registerHandler }