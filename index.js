import * as fs from 'fs';
import { join } from 'node:path';
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { log } from 'node:console';

const token = process.env.DISCORD_TOKEN

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.commands = new Collection();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const commandsPath = join(__dirname, 'commands');
// const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// // debug
// console.log(commandFiles);
// console.log(commandsPath);

// for (const file of commandFiles) {
// 	const filePath = path.join(commandsPath, file);
// 	import * as command from filepath;
// 	// Set a new item in the Collection with the key as the command name and the value as the exported module
// 	if ('data' in command && 'execute' in command) {
// 		client.commands.set(command.data.name, command);
// 	} else {
// 		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
// 	}
// }

// client.once(Events.ClientReady, () => {
// 	console.log('Ready!');
// });

// client.on(Events.InteractionCreate, async interaction => {
// 	if (!interaction.isChatInputCommand()) return;

// 	const command = client.commands.get(interaction.commandName);

// 	if (!command) return;

// 	try {
// 		await command.execute(interaction);
// 	} catch (error) {
// 		console.error(error);
// 		if (interaction.replied || interaction.deferred) {
// 			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
// 		} else {
// 			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
// 		}
// 	}
// });

client.login(token);

client.on('ready', () => {
	console.log(`${client.user.tag}`)
});

client.on('messageCreate', (message) => {
	console.log(message.content);
})