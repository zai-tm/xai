const {SlashCommandBuilder} = require('@discordjs/builders');

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
        await interaction.reply(`The :game_die: landed on **${roll}**`);
    },
};