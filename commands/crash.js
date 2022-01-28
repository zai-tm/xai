const {SlashCommandBuilder} = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('crash')
        .setDescription('Crash the bot... maybe'),
    async execute(interaction) {
        await interaction.reply(`Crashing the bot in 3...`);
        await wait(1000);
        await interaction.editReply(`Crashing the bot in 2...`);
        await wait(1000);
        await interaction.editReply(`Crashing the bot in 1...`);
        await wait(1000);
        await interaction.editReply(`${interaction.user.username} is not in the sudoers file. This incident will be reported.`);
    },
};