const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('basically echo')
        .addStringOption(option => option.setName('text').setDescription('what to say').setRequired(true)),
    async execute(interaction) {
        var text = interaction.options.getString('text')
        var length = text.length
        if (length > 255) {
            await interaction.reply({content: 'Your text is too long', ephemeral: true})
        } else {
           await interaction.reply(text);
        }
    },
};