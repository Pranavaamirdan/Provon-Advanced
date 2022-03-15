const fs = require('fs');

module.exports = (client, Discord, message) => {
    const load_dir = (dirs) => {
        const event_files = fs.readdirSync(`./📆 events/${dirs}`).filter(file => file.endsWith('.js'));

        for(const file of event_files ){
            const event = require(`../📆 events/${dirs}/${file}`)
            const event_name = file.split('.')[0];
            client.events.set(event.name, event);
            client.on(event_name, event.bind(null, Discord, client));
        }
    }
    
    fs.readdirSync("./📆 events/").forEach(event => load_dir(event));
}