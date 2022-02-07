const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Help me I am trapped in a discord bot and now Luihum is calling me an AI because I\'m trapped in a discord bot'),
    async execute(interaction) {
        await interaction.reply('This Help is to help you to use Help. Use help when you need help. Hope this helps!');
    },
};
