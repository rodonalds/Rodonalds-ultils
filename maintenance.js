const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ModalBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('maintenance')
        .setDescription('Puts bot on maintenance mode')
        .setDMPermission(false)
        .addBooleanOption((option) => option.setName("active").setDescription("Maintenance active").setRequired(true)),
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: false });

        if (!interaction.member.roles.cache.some(r => ['0', '0', '0'].includes(r.id))) {
            return (interaction.editReply({ content: '🔒 Missing Permission!' }))
        }

        if (interaction.options.getBoolean("active") == true) {
            interaction.editReply(`Maintenance mode is **active**!`)
            global.maintenance = true
        } else {
            interaction.editReply(`Maintenance mode is **inactive**!`)
            global.maintenance = false
        }
    },
};