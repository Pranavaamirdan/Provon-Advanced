const ascii = require('ascii-table')
let table = new ascii("🔥 Provon 🔥")
const fs = require('fs');
table.setHeading(` Category  `,'  Commands   ','  Status  ')

module.exports = (client, Discord) => {
    fs.readdirSync('./🗃️ commands/').forEach(dir => {
        const command_files = fs.readdirSync(`./🗃️ commands/${dir}`).filter(files => files.endsWith('.js'));
    for (const file of command_files) {
        const command = require(`../🗃️ commands/${dir}/${file}`);
        const fileName = file.split('.').slice(0, -1).join('.');
        const dirName = dir.slice(2,50);
        if (command.name) {
            client.commands.set(command.name, command);
            table.addRow(`${dirName}`,`${fileName}`,"————✔️————");
        } else {
            table.addRow(`${dirName}`,file,"    ❌    ");
            continue;
        }
    }
})
setTimeout(function(){
    console.log(table.toString());
    }, 0);
}