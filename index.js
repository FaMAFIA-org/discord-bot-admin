import { Client,Collection,Events,GatewayIntentBits,REST } from 'discord.js';
import { config } from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config();
const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.NODE_DISCORD_APP_ID;

const rest = new REST({ version: '10' }).setToken(TOKEN);

// Esto nos dice que partes necesitamos pedirle a la API
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		//GatewayIntentBits.MessageContent, // Esto requiere activar los intents desde el bot
	],
});

client.commands = new Collection();


client.on(Events.InteractionCreate,async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!',ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!',ephemeral: true });
		}
	}
});

// avisarnos que el bot se logueo
client.on('ready',() => {
	console.log(`the ${client.user.tag} bot has logged in!`);
})

// log in bot
client.login(TOKEN);

