const Discord = require("discord.js");
module.exports = {
  name: "stop",
  description: "stop the song!",
  async execute(message) {
    try {
      const serverQueue = message.client.queue.get(message.guild.id);
      if (!message.member.voice.channel) {
        console.log("need at the voice to stop");
        const errorEmbed = new Discord.MessageEmbed()
          .setColor("#FFF148")
          .setDescription(`請先進入一個語音頻道`)
          .setTitle("你要系語音頻道度先可以停止播歌!")
          .setFooter(
            "SawaBot"
            //"https://i.imgur.com/wSTFkRM.png"
          );
        return message.channel.send(errorEmbed);
      }
      console.log(serverQueue);
      if (!serverQueue || !serverQueue.songs) {
        console.log("stop but no songs");
        const errorEmbed = new Discord.MessageEmbed()
          .setColor("#FFF148")
          .setDescription(`請先打「*p (url)」加歌曲到播放清單`)
          .setTitle("冇歌俾你stop喇!")
          .setFooter(
            "SawaBot"
            //"https://i.imgur.com/wSTFkRM.png"
          );
        return message.channel.send(errorEmbed);
      }
      //serverQueue.songs = [];
      serverQueue.songs = 0;
      console.log(message.author.username + " stop songs");
      //serverQueue.textChannel.send(`>>> 皮已收`);
      message.react("👌");
      message.react("🤐");
      serverQueue.voiceChannel.leave();
      //serverQueue.connection.dispatcher.end();
    } catch (error) {
      console.log(error);
      message.channel.send(error.message);
    }
  },
};
