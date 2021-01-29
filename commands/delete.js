const Discord = require("discord.js");
module.exports = {
  name: "del",
  description: "delete the number song!",
  async execute(message) {
    try {
      const serverQueue = message.client.queue.get(message.guild.id);
      const args = message.content.split(" ");
      const numberExpression = /^\d+$/;
      if (!message.member.voice.channel) {
        console.log(
          message.author.username + " need at voice to check playlist"
        );
        const errorEmbed = new Discord.MessageEmbed()
          .setColor("#FFF148")
          .setDescription(`請先進入一個語音頻道!`)
          .setTitle("你只可以系語音頻道執行依個指令!")
          .setFooter(
            "SawaBot"
            //"https://i.imgur.com/wSTFkRM.png"
          );
        return message.channel.send(errorEmbed);
      }
      if (!serverQueue || !serverQueue.songs) {
        console.log(message.author.username + " playlist no sound");
        const errorEmbed = new Discord.MessageEmbed()
          .setColor("#FFF148")
          .setDescription(`請先打「*p (url)」加歌曲到播放清單`)
          .setTitle("播放清單入面冇歌!")
          .setFooter(
            "SawaBot"
            //"https://i.imgur.com/wSTFkRM.png"
          );
        message.channel.send(errorEmbed);
      } else if (!numberExpression.test(args[1])) {
        console.log(message.author.username + " delete song but not number");
        const errorEmbed = new Discord.MessageEmbed()
          .setColor("#FFF148")
          .setDescription(`打「*list」查下播放清單入面有乜歌`)
          .setTitle("輸入錯誤!幫唔到你喎，你要輸入數字!")
          .setFooter(
            "SawaBot"
            //"https://i.imgur.com/wSTFkRM.png"
          );
        return message.reply(errorEmbed);
      } else {
        console.log(serverQueue.songs.length);
        if (serverQueue.songs.length > parseInt(args[1])) {
          serverQueue.songs = serverQueue.songs
            .slice(0, parseInt(args[1]))
            .concat(
              serverQueue.songs.slice(
                parseInt(args[1]),
                serverQueue.songs.length
              )
            );
          const errorEmbed = new Discord.MessageEmbed()
            .setColor("#FFF148")
            .setDescription(`恭喜你先!`)
            .setTitle("已經幫你刪除第" + args[1] + "首")
            .setFooter(
              "SawaBot"
              //"https://i.imgur.com/wSTFkRM.png"
            );
          serverQueue.textChannel.send(errorEmbed);
        } else {
          const errorEmbed = new Discord.MessageEmbed()
            .setColor("#FFF148")
            .setDescription(
              `打「*del (數字)」刪除指定歌曲，打「*list」查下播放清單入面有乜歌`
            )
            .setTitle("幫唔到你喎，搵唔到你果首歌!你咪9打啦!")
            .setFooter(
              "SawaBot"
              //"https://i.imgur.com/wSTFkRM.png"
            );
          return message.reply(errorEmbed);
        }
      }
    } catch (error) {
      console.log(error);
      message.channel.send(error.message);
    }
  },
};
