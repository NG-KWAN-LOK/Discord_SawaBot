const Discord = require("discord.js");
module.exports = {
  name: "list",
  description: "stop the song!",
  async execute(message) {
    try {
      const serverQueue = message.client.queue.get(message.guild.id);
      if (!message.member.voice.channel) {
        console.log(
          message.author.username + " need at voice to check playlist"
        );
        const errorEmbed = new Discord.MessageEmbed()
          .setColor("#FFF148")
          .setDescription(`請先進入一個語音頻道`)
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
        channel.send(errorEmbed);
      } else {
        console.log(serverQueue.songs);
        let listString = "";
        serverQueue.songs.forEach((songs, index) => {
          if (index == 0) {
            listString +=
              "正在播放： **[" +
              songs.title +
              "]" +
              "(" +
              songs.url +
              ")" +
              "** \n";
          } else
            listString +=
              index +
              "：**[" +
              songs.title +
              "]" +
              "(" +
              songs.url +
              ")" +
              "** \n";
        });
        listString += "** 可以打「*del (數字)」，刪走指定既歌 **";
        const songListEmbed = new Discord.MessageEmbed()
          .setColor("#FFF148")
          .setDescription(listString)
          .setTitle("播放清單")
          .setFooter(
            "SawaBot"
            //"https://i.imgur.com/wSTFkRM.png"
          );
        serverQueue.textChannel.send(songListEmbed);
      }
    } catch (error) {
      console.log(error);
      message.channel.send(error.message);
    }
  },
};
