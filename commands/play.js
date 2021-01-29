const ytdl = require("ytdl-core");
const Discord = require("discord.js");
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
        const errorEmbed = new Discord.MessageEmbed()
          .setColor("#FFF148")
          .setDescription(`請先進入一個語音頻道!`)
          .setTitle("你要系語音頻道度先可以播歌!")
          .setFooter(
            "SawaBot"
            //"https://i.imgur.com/wSTFkRM.png"
          );
        return message.channel.send(errorEmbed);
      }
      const permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        console.log("need permisstion to join and speak");
        const errorEmbed = new Discord.MessageEmbed()
          .setColor("#FFF148")
          .setDescription(`請設定頻道權限俾我!`)
          .setTitle("我要權限加入依個頻道同系依個頻道度講野!")
          .setFooter(
            "SawaBot"
            //"https://i.imgur.com/wSTFkRM.png"
          );
        return message.channel.send(errorEmbed);
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
        const addSongEmbed = new Discord.MessageEmbed()
          .setColor("#FFF148")
          .setDescription(`**[${song.title}](${song.url})**`)
          .setTitle("已加入到播放隊列!")
          //.setURL("https://discord.js.org/")
          // .setAuthor(
          //   "SawaBot"
          //   //"https://i.imgur.com/wSTFkRM.png",
          //   //"https://discord.js.org"
          // )
          .setFooter(
            "SawaBot"
            //"https://i.imgur.com/wSTFkRM.png"
          );
        return message.channel.send(addSongEmbed);
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
      const errorEmbed = new Discord.MessageEmbed()
        .setColor("#FFF148")
        .setDescription(`打「*p (url)」再次召喚我嚟播歌`)
        .setTitle("全部歌曲已播放完畢!")
        .setFooter(
          "SawaBot"
          //"https://i.imgur.com/wSTFkRM.png"
        );
      serverQueue.textChannel.send(errorEmbed);
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
    const playSongEmbed = new Discord.MessageEmbed()
      .setColor("#FFF148")
      .setDescription(`**[${song.title}](${song.url})**`)
      .setTitle("依家為你播放")
      //.setURL("https://discord.js.org/")
      // .setAuthor(
      //   "SawaBot"
      //   //"https://i.imgur.com/wSTFkRM.png",
      //   //"https://discord.js.org"
      // )
      .setFooter(
        "SawaBot"
        //"https://i.imgur.com/wSTFkRM.png"
      );
    serverQueue.textChannel.send(playSongEmbed);
    console.log("playing: " + song.title);
  },
};
