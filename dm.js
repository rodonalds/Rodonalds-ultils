const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ModalBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dm')
        .setDescription('Dm a user via the bot')
        .setDMPermission(false)
        .addUserOption((option) => option.setName("user").setDescription("User to dm").setRequired(true))
        .addStringOption((option) => option.setName("msg").setDescription("Message to dm").setRequired(true)),
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: false });

        if ((global.maintenance ?? false) == true) {
            return (interaction.editReply({ content: '❗ Bot is currently on maintenance mode!' }))
        }

        if (!interaction.member.roles.cache.some(r => ['0', '0', '0'].includes(r.id))) {
            return (interaction.editReply({ content: '🔒 Missing Permission!' }))
        }

        client.users.fetch(interaction.options.getUser("user").id)
            .then((user) => {
                user.send(`${interaction.options.getString("msg")}`);
                interaction.editReply('✅ DM has been sent!')
            })
            .catch((error) => {
                interaction.editReply(`❗ Error fetching user: ${error.message}`);
            });
    },
};