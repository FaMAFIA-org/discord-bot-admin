import { InteractionType, MessageFlags } from '@discordjs/core';
const pingFunction = async ({ data: interaction, api }) => {
	if (
		interaction.type !== InteractionType.ApplicationCommand ||
		interaction.data.name !== 'ping'
	) {
		return;
	}

	await api.interactions.reply(interaction.id, interaction.token, {
		content: 'Pong!',
		flags: MessageFlags.Ephemeral,
	});
};

export default pingFunction;
