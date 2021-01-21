module.exports = {
  name: "list",
  description: "stop the song!",
  async execute(message) {
    try {
      const serverQueue = message.client.queue.get(message.guild.id);
      if (!message.member.voice.channel) {
        console.log("need at voice to check playlist");
        return message.channel.send("你只可以系語音頻道執行依個指令");
      }
      if (!serverQueue || !serverQueue.songs) {
        console.log("playlist no sound");
        channel.send("播放清單入面冇歌!");
      } else {
        console.log(serverQueue.songs);
        let listString = "播放清單：\n";
        serverQueue.songs.forEach((songs, index) => {
          if (index == 0) {
            listString += "正在播放： **" + songs.title + "** \n";
          } else listString += index + "：" + songs.title + "\n";
        });
        listString += "可以打「*del (數字)」，刪走指定既歌";
        serverQueue.textChannel.send(listString);
      }
    } catch (error) {
      console.log(error);
      message.channel.send(error.message);
    }
  },
};
