const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dice')
        .setDescription('rolls a dice!')
        .addIntegerOption(option => option.setName('sides').setDescription('The number of sides the dice has. Leave blank for 6.')),
    async execute(interaction) {
        var sides = interaction.options.getInteger('sides')
        if (!sides) {
            sides = 6
        } else {
            interaction.options.getInteger('sides')
        }
        var roll = Math.ceil(Math.random() * sides)

        const rollEmbed = new MessageEmbed()
        .setTitle('Dice')
        .addFields(
            {title: 'The dice landed on...', value:`**roll**.`}
        )
        .setTimestamp();
        
        await interaction.reply({embeds: [rollEmbed]});
    },
};
