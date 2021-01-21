module.exports = {
  name: "test",
  description: "test the bot alive!",
  async execute(message) {
    try {
      message.channel.send(`我系度!`);
    } catch (error) {
      console.log(error);
      message.channel.send(error.message);
    }
  },
};
