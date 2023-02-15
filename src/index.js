require('dotenv').config()
const { Client, GatewayIntentBits, Collection} = require('discord.js');
const fs = require('fs')
const path = require('path')

const TOKEN = process.env.BOT_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
    ]});

client.login(TOKEN);

// console.log(`# COMMANDS:`);

// client.commands = new Collection();
// const commandsPath = path.join(process.cwd(), 'src/commands');
// const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
// for (let file of commandFiles) {
// 	const filePath = path.join(commandsPath, file);
// 	const command = require(filePath);
//   console.log(`( / )Loaded ${file}`)
// 	client.commands.set(command.data.name, command);
// }

// client.contextCommands = new Collection();
// const contextCommandsPath = path.join(process.cwd(), 'src/contextMenuCommands');
// const contextCommandFiles = fs.readdirSync(contextCommandsPath).filter(file => file.endsWith('.js'));
// for (let file of contextCommandFiles) {
// 	const filePath = path.join(contextCommandsPath, file);
// 	const contextCommand = require(filePath);
//   console.log(`( C )Loaded ${file}`)
// 	client.contextCommands.set(contextCommand.data.name, contextCommand);
// }


console.log(`# EVENTS:`);
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
  console.log(`Loaded ${file}`)
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
process.on('warning', e => console.warn(e.stack));
module.exports = client;

