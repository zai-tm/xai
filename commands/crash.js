const {SlashCommandBuilder} = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);
const { MessageActionRow, MessageButton} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('crash')
        .setDescription('Crash the bot... maybe'),
    async execute(interaction) {

        const yesNo = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('yes')
                .setLabel('Yes')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId('no')
                .setLabel('No')
                .setStyle('DANGER')
        );

        await interaction.reply('Are you sure?\nYou have 10 seconds.', {components: [yesNo], fetchReply: true});
        await wait(10000);
        await interaction.reply('Timed out', {});
        const collector = interaction.message.createMessageComponentCollector({ componentType: 'BUTTON', time: 10000});

        await interaction.reply(`Crashing the bot in 3...`);
        await wait(1000);
        await interaction.editReply(`Crashing the bot in 2...`);
        await wait(1000);
        await interaction.editReply(`Crashing the bot in 1...`);
        await wait(1000);
        await interaction.editReply(`${interaction.user.username} is not in the sudoers file. This incident will be reported.`);
    },
};