const fs = require("fs");

module.exports = {
  name: "help",
  aliases: ["h"],
  category: "📜 Info",
  usage: `<prefix>help/<prefix>help <command>`,
  permissions: ["SEND_MESSAGES"],
  cooldown: 5,
  description: "helps with the command",
  async execute(Discord, client, message, args, cmd) {
    const guildId = await message.guild.id;
    //const { prefix }  = client.configs.get(guildId);
    const prefix = process.env.prefix
    if (!args[0]) {
    let categories = [];

      fs.readdirSync("./🗃️ commands/").forEach((dir) => {
        const commands = fs.readdirSync(`./🗃️ commands/${dir}`).filter((files) => files.endsWith(".js"));

        const cmds = commands.map((command) => {
          let file = require(`../../🗃️ commands/${dir}/${command}`);

          if (!file.name) return "No command name found.";

          let name = file.name.replace(".js", "");
          const description = client.commands.get(name).description;
          return `\`${name}\` \:heavy_minus_sign: ${description}\n`;
        });

        let data = new Object();
        const dirName = dir.slice(2,50)
        data = {
            name: `> ${dirName}`,
            value: cmds.length === 0 ? 'In Progress' : cmds.join(''),        
        }

    categories.push(data);
      });
      //const { prefix }  = client.configs.get(message.guild.id);
      const embed = new Discord.MessageEmbed()
        .setAuthor({
          name: `${client.user.username}`,
          iconURL: client.user.displayAvatarURL()})
        .addFields(categories)
        .setTitle("📬 Need help? Here are all of my commands:")
        .setDescription(`\`\`\`Use ${prefix}help followed by a command name to get more additional information on a command or ${prefix}helpdocument/hd for the documentation. For example: ${prefix}help ban.\`\`\``)
        .setFooter(`Requested by ${message.author.tag}`,message.author.displayAvatarURL({ dynamic: true }))
        .setThumbnail(client.user.displayAvatarURL())
        .setColor('#ff9a00')

       message.reply({ embeds: [embed] });
    } else if (args[0]) {
      const nameData = [];
      const aliasesData = [];
      const categoryData = [];
      const usageData = [];
      const permissionsData = [];
      const cooldownData = [];
      const descriptionData = [];
      const name = args[0].toLowerCase();
      nameData.push(name);
      const command =
        client.commands.get(name) ||
        client.commands.find((a) => a.aliases && a.aliases.includes(name));
      if (command) {
        if (command.aliases) {
            const aliases = command.aliases;
            aliasesData.push(aliases);
        }
        if (command.category) {
          const category = command.category;
          categoryData.push(category);
        }
        if (command.usage) {
          const usage = command.usage;
          usageData.push(usage);
        }
        if (command.permissions) {
          const permissions = command.permissions;
          permissionsData.push(permissions);
        }
        if (command.cooldown) {
          const cooldown = command.cooldown;
          cooldownData.push(cooldown);
        }
        if (command.description) {
          const description = command.description;
          descriptionData.push(description);
        }
      }
      const prefix = process.env.prefix;
      const embed = new Discord.MessageEmbed()
        .setAuthor({
          name: `${client.user.username}`,
          iconURL: client.user.displayAvatarURL()})
        .setTitle("```✔️ Command Information```")
        .setDescription(`> **⭕Bot Prefix**:\n> \`${prefix}\``,true)
        .addField(`> **\⭕ Command Name:**`, `> \`${nameData}\``,true)
        .addField(`> **\⭕ Command Aliases:**`, `> \`${aliasesData}\``,true)
        .addField(`> **\⭕ Command Category:**`, `> \`${categoryData}\``,true)
        .addField(`> **\⭕ Command Usage:**`, `> \`${usageData}\``,true)
        .addField(`> **\⭕ Command Permissions:**`, `> \`${permissionsData}\``,true)
        .addField(`> **\⭕ Command Cooldown:**`, `> \`${cooldownData}seconds\``,true)
        .addField(`> **\⭕ Command Description:**`, `> \`${descriptionData}\``,true)
        .setColor("#ff9a00")
        .setFooter({
          text: `Requested by ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL({ dynamic: true })
        });

      if(!aliasesData.length && !categoryData.length && !usageData.length && !permissionsData.length && !descriptionData.length){
        const nocmd = new Discord.MessageEmbed()
        .setTitle("```❌ Command Information```")
        .setDescription(`> **There is no such command named "${args[0]}" **`,true)
        .setColor("#ff9a00");
        message.reply({ embeds: [nocmd] });
      }else{
            message.reply({ embeds: [embed] });
      }
    }
  },
};