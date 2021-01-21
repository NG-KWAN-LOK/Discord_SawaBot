module.exports = {
  name: "stop",
  description: "stop the song!",
  async execute(message) {
    try {
      const serverQueue = message.client.queue.get(message.guild.id);
      if (!message.member.voice.channel) {
        console.log("need at the voice to stop");
        return message.channel.send("你要系語音頻道度先可以停止播歌!");
      }
      console.log(serverQueue);
      if (!serverQueue || !serverQueue.songs) {
        console.log("stop but no songs");
        return message.channel.send("冇歌俾你stop喇!");
      }
      //serverQueue.songs = [];
      serverQueue.songs = 0;
      console.log("stop songs");
      serverQueue.textChannel.send(`皮已收`);
      serverQueue.voiceChannel.leave();
      //serverQueue.connection.dispatcher.end();
    } catch (error) {
      console.log(error);
      message.channel.send(error.message);
    }
  },
};
