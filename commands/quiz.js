const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quiz')
        .setDescription('progressbar95 quiz'),
    async execute(interaction) {
        await interaction.reply(`I don't have this command done yet`);
    },
};