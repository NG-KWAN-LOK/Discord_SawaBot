//const { process.env.prefix, process.env.token } = require("./config.json");
const fs = require("fs");
const Discord = require("discord.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.activitys = new Discord.Collection();
client.queue = new Map();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
const activitysFiles = fs
  .readdirSync("./activitys")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
for (const file of activitysFiles) {
  const activitys = require(`./activitys/${file}`);
  client.activitys.set(activitys.name, activitys);
}
console.log(client.commands);
console.log(client.activitys);
client.once("ready", async () => {
  console.log("Ready!");
  setActivity();
  setInterval(setActivity, 1000 * 60 * 4);
});

function setActivity() {
  //console.log("setActivity");
  const activitysName = Math.floor(Math.random() * Math.floor(3));
  const activitys = client.activitys.get(activitysName.toString());
  //const activitys = client.activitys.get("1");
  console.log("setActivity" + activitysName, activitys.description);
  activitys.execute(client);
}

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
