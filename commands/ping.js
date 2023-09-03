import { SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Responds with PONG!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },

}

//ALGO QUE N+O VALE LA PENA!!!