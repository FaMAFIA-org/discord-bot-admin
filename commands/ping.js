import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Responds with PONG!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },

}
