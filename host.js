const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ModalBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('host')
        .setDescription('Host a training')
        .setDMPermission(false),
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: false });

        if ((global.maintenance ?? false) == true) {
            return (interaction.editReply({ content: '❗ Bot is currently on maintenance mode!' }))
        }

        if (!interaction.member.roles.cache.some(r => ['0', '0', '0'].includes(r.id))) {
            return (interaction.editReply({ content: '🔒 Missing Permission!' }))
        }

        const Embed = new EmbedBuilder()
            .setColor(0x023020)
            .setTitle(`McRonald's Trainings`)
            .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true })}`, url: 'https://discord.gg/bhsXPb2U2M' })
            .setDescription(`**Training Session**\n\nA **training session** is being hosted right now! If you are a **Trainee+**, and would like to work here and advance then come on down! If you have missed this session, don't worry! There's more to be hosted.\n\n**TRAINING CENTER LINK:\n> https://www.roblox.com/games/15958334493/Training-Centre`)
            .setTimestamp()
            .addFields(
                { name: 'Host', value: `<@${interaction.user.id}>`, inline: true },
            );

        client.channels.cache.get('0').send({ content: '<@&0>', embeds: [Embed] });
        return interaction.editReply('✅ Success!');
    },
};