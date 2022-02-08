const {SlashCommandBuilder} = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);
const {MessageEmbed} = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('credit')
        .setDescription('What is you Progress Credit™?'),
    async execute(interaction) {
        const number = Math.floor(Math.random() * 6)
        const credit = 0
        const image = `https://zai-tm.github.io/credit/${number}.png`


        const creditEmbed = new MessageEmbed()
            .setTitle('Progress Credit™')
            .setImage(image)
            .setTimestamp();

        await interaction.reply({embeds: [creditEmbed]});
    },
};