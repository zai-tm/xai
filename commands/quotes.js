const {SlashCommandBuilder} = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
let quotes = require('./quotes.json');
const quote = quotes.quotes
module.exports = {
    data: new SlashCommandBuilder()
        .setName('quotes')
        .setDescription('A random quote that is most likely dumb'),
    async execute(interaction) {
        // const quotesParsed = JSON.parse(quotes)
        var quoteImage = "" 
        const number = Math.floor(Math.random() * Object.keys(quote).length);
        const quoteText = quote[number].text;
        const randomColor = Math.floor(Math.random()*16777215).toString(16);

        try {
            var quoteImage = quote[number].image
        } catch (error) {
            var quoteImage = ""
        }

        const quoteEmbed = new MessageEmbed()
        .setAuthor(quote[number].author)
        .setDescription(quoteText.replaceAll('\\n', '\n') + '\n\n[Suggest a quote](https://forms.gle/BAZ2rzgYcaDXf9tR7)')
        .setFooter('Inspirational quotes provided by the Progressbar95 community')
        .setTimestamp()
        .setImage(quoteImage)
        .setColor(randomColor);
        await interaction.reply({embeds: [quoteEmbed]});
    },
};