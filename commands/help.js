const Discord = require("discord.js");
module.exports = {
  name: "h",
  description: "check the ping!",
  async execute(message) {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#FFF148")
      .setTitle("SawaBot Help")
      //.setURL("https://discord.js.org/")
      .setAuthor(
        "SawaBot"
        //"https://i.imgur.com/wSTFkRM.png",
        //"https://discord.js.org"
      )
      .setDescription("全廣東話字幕機器人")
      //.setThumbnail("https://i.imgur.com/wSTFkRM.png")
      // .addFields(
      //   { name: 'Regular field title', value: 'Some value here' },
      //   { name: '\u200B', value: '\u200B' },
      //   { name: 'Inline field title', value: 'Some value here', inline: true },
      //   { name: 'Inline field title', value: 'Some value here', inline: true },
      // )
      .addField(
        "指令表：",
        "*p (url)：播歌/加啲歌入播放隊列\n*stop：叫個bot收皮\n*skip：跳過依家播緊果首歌\n*del (數字)：刪除播放清單內指定歌曲\n*list：列出播放清單有乜野歌\n*h：指令表\n*test：睇下個bot仲系唔系度\n*ping：睇下ping數",
        true
      )
      //.setImage("https://i.imgur.com/wSTFkRM.png")
      //.setTimestamp()
      .setFooter(
        "by:Sawajiri\nGithub:NG-KWAN-LOK"
        //"https://i.imgur.com/wSTFkRM.png"
      );
    try {
      // message.channel.send(
      //   ">>> SawaBot -- by:Sawajiri; Github:NG-KWAN-LOK\n指令表：\n*p (url)：播歌/加啲歌入播放隊列\n*stop：叫個bot收皮\n*skip：跳過依家播緊果首歌\n*del (數字)：刪除播放清單內指定歌曲\n*list：列出播放清單有乜野歌\n*h：指令表\n*test：睇下個bot仲系唔系度\n*ping：睇下ping數"
      // );
      console.log(message.author.username + " check help");
      message.channel.send(exampleEmbed);
    } catch (error) {
      console.log(error);
      message.channel.send(error.message);
    }
  },
};
