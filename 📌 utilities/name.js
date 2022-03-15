const { color } = require("./text.js");

function namePrint(){
    
    line1 =  `${color["FgGreen"]}┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`
    line2 =  `${color["FgGreen"]}┃                                                                                          ┃`
    line3 =  `${color["FgGreen"]}┃${color["FgMagenta"]}       ╭——————————╮                                                                       ${color["end"]}${color["FgGreen"]}┃`
    line4 =  `${color["FgGreen"]}┃${color["FgMagenta"]}       ●  ╭————╮  ●                                                                       ${color["end"]}${color["FgGreen"]}┃`
    line5 =  `${color["FgGreen"]}┃${color["FgMagenta"]}       ●  │    │  ●                                                                       ${color["end"]}${color["FgGreen"]}┃`
    line6 =  `${color["FgGreen"]}┃${color["FgMagenta"]}       ●  │    │  ●                                                                       ${color["end"]}${color["FgGreen"]}┃`
    line7 =  `${color["FgGreen"]}┃${color["FgMagenta"]}       ●  ╰————╯  ●                                                                       ${color["end"]}${color["FgGreen"]}┃`
    line8 =  `${color["FgGreen"]}┃${color["FgMagenta"]}       ●  ╭———————╯ ╭————————╮  ╭————————╮  ╭——╮      ╭——╮  ╭————————╮  ╭——╮   ╭——╮       ${color["end"]}${color["FgGreen"]}┃`
    line9 =  `${color["FgGreen"]}┃${color["FgMagenta"]}       ●  ●         ╰╮  ╭——╮ │  ●  ╭——╮  ●   ●  ●    ●  ●   ●  ╭——╮  ●  ●  ●   ●  ●       ${color["end"]}${color["FgGreen"]}┃`
    line10 = `${color["FgGreen"]}┃${color["FgMagenta"]}       ●  ●          ●  ●  ╰—╯  ●  │  │  ●    ●  ●  ●  ●    ●  │  │  ●  ●  ● ╲ ●  ●       ${color["end"]}${color["FgGreen"]}┃`
    line11 = `${color["FgGreen"]}┃${color["FgMagenta"]}       ●  ●          ●  ●       ●  ╰——╯  ●     ●  ●●  ●     ●  ╰——╯  ●  ●  ●   ●  ●       ${color["end"]}${color["FgGreen"]}┃`
    line12 = `${color["FgGreen"]}┃${color["FgMagenta"]}       ╰——╯          ╰——╯       ╰————————╯      ●————●      ╰————————╯  ╰——╯   ╰——╯       ${color["end"]}${color["FgGreen"]}┃`
    line13 = `${color["FgGreen"]}┃                                                                                          ${color["end"]}${color["FgGreen"]}┃`
    line14 = `${color["FgGreen"]}┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛${color["end"]}`
    
    console.log(line1)
    console.log(line2)
    console.log(line3)
    console.log(line4)
    console.log(line5)
    console.log(line6)
    console.log(line7)
    console.log(line8)
    console.log(line9)
    console.log(line10)
    console.log(line11)
    console.log(line12)
    console.log(line13)
    console.log(line14)
}
  

module.exports = { namePrint };