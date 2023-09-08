import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('warning')
        .setDescription('Cuidadito che...'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },

}
