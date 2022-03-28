const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('time')
        .setDescription('I\'ve lost all sense of it'),
    async execute(interaction) {
        const currentTimestamp = Math.round(+new Date() / 1000);
        const timestampColour = currentTimestamp.toString(16).substring(2, 10);

        const embed = new MessageEmbed()
            .setTitle('Current Time')
            .setDescription(`<t:${currentTimestamp}:T>`)
            .setColor(`${timestampColour}`);
        await interaction.reply({embeds: [embed]});
    },
};