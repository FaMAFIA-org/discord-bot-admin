import { Client,Collection,GatewayIntentBits,REST,Routes } from 'discord.js';
import { config } from 'dotenv';
import * as fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config();
const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.NODE_DISCORD_APP_ID;

// Comandos
const commands = [
	{
		name: 'ping',
		description: 'Replies with Pong!',
	},
	{
		name: 'warning',
		description: 'cuidadito che...',
		options: [
			{
				name: 'user',
				description: 'usuario',
				type: 6,
				required: true,
			},
			{
				name: 'motivo',
				description: 'infraccion',
				type: 3,
				required: true,
			}
		]
	}
];

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

const commandsPath = path.join(__dirname,'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath,file);
	const { default: command } = await import(filePath);
	console.log(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name,command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}



try {
	console.log('Started refreshing application (/) commands.');

	await rest.put(Routes.applicationCommands(CLIENT_ID),{ body: commands });

	console.log('Successfully reloaded application (/) commands.');
} catch (error) {
	console.error(error);
}

// handle slash commands
client.on('interactionCreate',async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (interaction.commandName === 'warning') {
		console.log(interaction.options.get('user'))
		await interaction.reply(`ahora ${interaction.options.get('user').user} se gano un warning por: ${interaction.options.get('motivo').value}`)
	}
});

// avisarnos que el bot se logueo
client.on('ready',() => {
	console.log(`the ${client.user.tag} bot has logged in!`);
})

// log in bot
client.login(TOKEN);

