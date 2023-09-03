import { REST } from '@discordjs/rest';
import { WebSocketManager } from '@discordjs/ws';
import { GatewayDispatchEvents, GatewayIntentBits, Client } from '@discordjs/core';
import pingFunction from './commands/new-ping.js';
// Create REST and WebSocket managers directly
const rest = new REST({ version: '10' }).setToken(process.env.NODE_DISCORD_TOKEN);

const gateway = new WebSocketManager({
	token: process.env.NODE_DISCORD_TOKEN,
	intents: GatewayIntentBits.GuildMessages | GatewayIntentBits.MessageContent,
	rest,
});

// Create a client to emit relevant events.
const client = new Client({ rest, gateway });

// Listen for interactions
// Each event contains an `api` prop along with the event data that allows you to interface with the Discord REST API
client.on(GatewayDispatchEvents.InteractionCreate, pingFunction);

// Listen for the ready event
client.once(GatewayDispatchEvents.Ready, () => console.log('Ready!'));

// Start the WebSocket connection.
gateway.connect();