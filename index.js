const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const ytdl = require("ytdl-core");

const client = new Discord.Client();
let channel = null;
const queue = new Map();
let isStop = true;

client.once("ready", async () => {
  console.log("Ready!");
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(`${prefix}p`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}skip`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content === `${prefix}stop`) {
    stop(message, serverQueue);
    return;
  } else if (message.content === `${prefix}list`) {
    playlist(message, serverQueue);
    return;
  } else if (message.content === `${prefix}test`) {
    test(message, serverQueue);
    return;
  } else if (message.content === `${prefix}h`) {
    help(message, serverQueue);
    return;
  } else {
    message.channel.send("唔知你打乜L野! 打「*h」睇下有乜指令先!");
  }
});

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }
  channel = message.channel;
  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
    title: songInfo.videoDetails.title,
    url: songInfo.videoDetails.video_url,
  };

  if (!serverQueue) {
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
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} 已加入到播放隊列!`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send("你要系語音頻道度先可以停止播歌!");
  if (!serverQueue) {
    return message.channel.send("冇歌俾你skip喇!");
  } else {
    serverQueue.songs.shift();
    play(message.guild, serverQueue.songs[0]);
  }
  //serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send("你要系語音頻道度先可以停止播歌!");

  if (!serverQueue || !serverQueue.songs)
    return message.channel.send("冇歌俾你stop喇!");
  queue.clear();
  isStop = true;
  serverQueue.textChannel.send(`皮已收`);
  serverQueue.voiceChannel.leave();
  //serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  console.log(guild, guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    serverQueue.textChannel.send(`全部歌曲已播放完畢`);
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", (error) => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`依家播放: **${song.title}**`);
}
function playlist(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send("你只可以系語音頻道執行依個指令");
  if (!serverQueue || !serverQueue.songs) {
    channel.send("播放清單入面冇歌!");
  } else {
    console.log(serverQueue.songs);
    let listString = "播放清單：\n";
    serverQueue.songs.forEach((songs, index) => {
      listString += index + "：" + songs.title + "\n";
    });
    serverQueue.textChannel.send(listString);
  }
}

function test(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send("你只可以系語音頻道執行依個指令");
  console.log(serverQueue);
  serverQueue.textChannel.send(`我仲系度!`);
}
function help(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send("你只可以系語音頻道執行依個指令");
  serverQueue.textChannel.send(
    `指令表：\n*p (url)：播歌/加啲歌入播放隊列\n*stop：叫個bot收皮\n*skip：skip咗依家播緊果首歌\n*list：列出播放清單有乜野歌\n*h：指令表\n*test：睇下個bot仲系唔系度`
  );
}
client.login(token);
