module.exports = {
  name: "del",
  description: "delete the number song!",
  async execute(message) {
    try {
      const serverQueue = message.client.queue.get(message.guild.id);
      const args = message.content.split(" ");
      const numberExpression = /^\d+$/;
      if (!message.member.voice.channel) {
        console.log("need at voice to check playlist");
        return message.channel.send("你只可以系語音頻道執行依個指令");
      }
      if (!serverQueue || !serverQueue.songs) {
        console.log("playlist no sound");
        message.channel.send("播放清單入面冇歌!");
      } else if (!numberExpression.test(args[1])) {
        console.log("delete song but not number");
        return message.reply("幫唔到你喎，你要輸入數字!");
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
          serverQueue.textChannel.send("已經幫你刪除第" + args[1] + "首");
        } else {
          return message.reply("幫唔到你喎，搵唔到你果首歌，你咪9打啦!");
        }
      }
    } catch (error) {
      console.log(error);
      message.channel.send(error.message);
    }
  },
};
