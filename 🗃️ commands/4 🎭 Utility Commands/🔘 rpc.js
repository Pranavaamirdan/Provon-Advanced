const { MessageButton, MessageActionRow } = require('discord.js')

module.exports = {
    name: 'rpc',
    aliases: ['rockpaperscissor'],
    category: "🎭 Utility",
    usage:'<prefix>rpc/rockpaperscissor', 
    permissions: ["SEND_MESSAGES"],
    cooldown: 5,
    description: 'rockpaperscissor game',
    async execute(Discord, client, message, args, cmd){
    //let buttonEmoji1 = bot.emojis.cache.find(emoji => emoji.id === "850115998341529600")
        //let buttonEmoji2 = bot.emojis.cache.find(emoji => emoji.id === "850117123422027837")
 
        const Rock = new MessageButton()
            .setStyle("blurple")
            .setEmoji(`🌑`)
            .setLabel("Rock")
            .setID('rock')
 
        const Paper = new MessageButton()
            .setStyle("blurple")
            .setEmoji(`📄`)
            .setLabel("Paper")
            .setID('paper')
 
        const Scissors = new MessageButton()
            .setStyle("blurple")
            .setEmoji('✂️')
            .setLabel("Scissors")
            .setID('scissors')
 
        let choices = ["rock", "paper", "scissors"]
        let index = Math.floor(Math.random() * 3)
        let ai = choices[index]
 
        let group1 = new MessageActionRow().addComponents([Rock, Paper, Scissors]);
 
        message.channel.send("Rock : 🌑    Paper : 📄    Scissors : ✂️", {
            components: [group1]
        }).then((m) => {
 
            const filter = (button) => button.clicker.user.id === message.author.id;
 
            const collector = m.createButtonCollector(filter, {
                time: 30000
            })
 
            collector.on('collect', async (button) => {
 
                switch (ai) {
                    case "rock":
                            if (button.id == "paper") m.edit("<a:party_popper:845331818101080084> You won, you had `paper` and I had `rock`!")
                            if (button.id == "scissors") m.edit("<a:alarm:845329442695675977> You lost, you had `scissors` and I had `rock`!")
                            if (button.id == "rock") m.edit("<a:neonnice:845340675561095209> We tied, you had `rock` and I had `rock`!")
                        break;
                    case "paper":
                            if (button.id == "scissors") m.edit("<a:party_popper:845331818101080084> You won, you had `scissors` and I had `paper`!")
                            if (button.id == "rock") m.edit("<a:alarm:845329442695675977> You lost, you had `rock` and I had `paper`!")
                            if (button.id == "paper") m.edit("<a:neonnice:845340675561095209> We tied, you had `paper` and I had `paper`!")
                        break;
                    case "scissors":
                            if (button.id == "rock") m.edit("<a:party_popper:845331818101080084> You won, you had `rock` and I had `scissors`!")
                            if (button.id == "paper") m.edit("<a:alarm:845329442695675977> You lost, you had `paper` and I had `scissors`!")
                            if (button.id == "scissors") m.edit("<a:neonnice:845340675561095209> We tied, you had `scissors` and I had `scissors`!")
                        break
                }
 
            });
            collector.on('end', (collected) => {
                if (collected.size == 0) m.edit("<a:alarm:845329442695675977> Time window has passed I win, I had `"+ai+"`!")
            });
        })
  
    }
}