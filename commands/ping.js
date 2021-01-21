module.exports = {
  name: "ping",
  description: "check the ping!",
  async execute(message) {
    try {
      message.channel.send(`延遲：**${message.client.ws.ping}ms** !`);
    } catch (error) {
      console.log(error);
      message.channel.send(error.message);
    }
  },
};
