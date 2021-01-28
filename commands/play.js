const ytdl = require("ytdl-core");
module.exports = {
  name: "p",
  description: "Play a song in your channel!",
  async execute(message) {
    try {
      //console.log(message.client);
      const queue = message.client.queue;
      const args = message.content.split(" ");
      const serverQueue = message.client.queue.get(message.guild.id);

      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel) {
        console.log("need at the voice channal to play");
        return message.channel.send("你要系語音頻道度先可以播歌!");
      }
      const permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        console.log("need permisstion to join and speak");
        return message.channel.send("我要權限加入依個頻道同系依個頻道度講野");
      }
      channel = message.channel;
      const songInfo = await ytdl.getInfo(args[1]);
      const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
      };

      if (!serverQueue || !serverQueue.songs) {
        const queueContruct = {
          textChannel: message.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 5,
          playing: true,
        };

        queue.set(message.guild.id, queueContruct);

        queueContruct.songs.push(song);

        try {
          var connection = await voiceChannel.join();
          console.log("try play1");
          queueContruct.connection = connection;
          this.play(message, queueContruct.songs[0]);
        } catch (err) {
          console.log(err);
          queue.delete(message.guild.id);
          return message.channel.send(err);
        }
      } else {
        serverQueue.songs.push(song);
        console.log("add " + song.title + "to queue");
        return message.channel.send(`${song.title} 已加入到播放隊列!`);
      }
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
