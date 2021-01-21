const ytdl = require("ytdl-core");
module.exports = {
  name: "skip",
  description: "skip the song!",
  async execute(message) {
    try {
      const serverQueue = message.client.queue.get(message.guild.id);
      if (!message.member.voice.channel)
        return message.channel.send("你要系語音頻道度先可以停止播歌!");
      if (!serverQueue) {
        return message.channel.send("冇歌俾你skip喇!");
      } else {
        serverQueue.songs.shift();
        this.play(message, serverQueue.songs[0]);
      }
      //serverQueue.connection.dispatcher.end();
    } catch (error) {
      console.log(error);
      message.channel.send(error.message);
    }
  },
  play(message, song) {
    const queue = message.client.queue;
    const guild = message.guild;
    const serverQueue = queue.get(message.guild.id);
    console.log(guild, guild.id);
    if (!song) {
      serverQueue.voiceChannel.leave();
      serverQueue.textChannel.send(`全部歌曲已播放完畢`);
      queue.delete(guild.id);
      //serverQueue.connection.dispatcher.end();
      console.log("all songs in queue end");
      return;
    }

    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        serverQueue.songs.shift();
        this.play(message, serverQueue.songs[0]);
      })
      .on("error", (error) => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`依家播放: **${song.title}**`);
    console.log("playing: " + song.title);
  },
};
