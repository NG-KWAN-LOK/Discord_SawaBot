//const { process.env.prefix, process.env.token } = require("./config.json");
const fs = require("fs");
const Discord = require("discord.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.queue = new Map();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
console.log(client.commands);
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
  const args = message.content.slice(process.env.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);

  if (message.author.bot) return;
  if (!message.content.startsWith(process.env.prefix)) return;

  try {
    if (commandName == "ban" || commandName == "userinfo") {
      command.execute(message, client);
    } else {
      command.execute(message);
    }
  } catch (error) {
    console.error(error);
    message.reply("唔知你打乜L野! 打「*h」睇下有乜指令先!");
  }
});

client.login(process.env.token);
