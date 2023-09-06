import { config } from 'dotenv';
import { REST, Routes, Client, GatewayIntentBits } from 'discord.js';

config();

// Comandos
const commands = [
	{
		name: 'ping',
		description: 'Replies with Pong!',
	},
];

const TOKEN = process.env.NODE_DISCORD_TOKEN;
const CLIENT_ID = process.env.NODE_DISCORD_APP_ID;

const rest = new REST({ version: '10' }).setToken(TOKEN);

try {
	console.log('Started refreshing application (/) commands.');

	await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

	console.log('Successfully reloaded application (/) commands.');
} catch (error) {
	console.error(error);
}

// Esto nos dice que partes necesitamos pedirle a la API
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		//GatewayIntentBits.MessageContent, // Esto requiere activar los intents desde el bot
	],
});

client.on('ready', () => {
	console.log(`the ${client.user.tag} bot has logged in!`);
})

// handle slash commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
});

// // log in bot
client.login(TOKEN);

