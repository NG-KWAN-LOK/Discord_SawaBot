const Discord = require("discord.js");
module.exports = {
  name: "test",
  description: "test the bot alive!",
  async execute(message) {
    try {
      const testEmbed = new Discord.MessageEmbed()
        .setColor("#FFF148")
        .setDescription("I am ready! I am ready! over over!")
        .setTitle("我系度")
        .setFooter(
          "SawaBot"
          //"https://i.imgur.com/wSTFkRM.png"
        );
      message.channel.send(testEmbed);
    } catch (error) {
      console.log(error);
      message.channel.send(error.message);
    }
  },
};
