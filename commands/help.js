module.exports = {
  name: "h",
  description: "check the ping!",
  async execute(message) {
    try {
      message.channel.send(
        `SawaBot -- by:Sawajiri; Github:NG-KWAN-LOK\n指令表：\n*p (url)：播歌/加啲歌入播放隊列\n*stop：叫個bot收皮\n*skip：skip咗依家播緊果首歌\n*del (數字)：刪除播放清單內指定歌曲*list：列出播放清單有乜野歌\n*h：指令表\n*test：睇下個bot仲系唔系度\n*ping：睇下ping數`
      );
    } catch (error) {
      console.log(error);
      message.channel.send(error.message);
    }
  },
};
