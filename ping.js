const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ModalBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!')
        .setDMPermission(false),
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: false });

        if ((global.maintenance ?? false) == true) {
            return (interaction.editReply({ content: '❗ Bot is currently on maintenance mode!' }))
        }

        if (!interaction.member.roles.cache.some(r => ['0', '0', '0'].includes(r.id))) {
            return (interaction.editReply({ content: '🔒 Missing Permission!' }))
        }

        interaction.editReply(`🏓 PONG!\nLatency is ${Math.round(client.ws.ping)}ms`)
    },
};