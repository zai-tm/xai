const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');
const death = require('./death.json')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('kill')
    .setDescription('Kill someone (luihum begged me for this command)')
    .addUserOption(option => option.setName('victim').setDescription('the chosen one').setRequired(true)),
    async execute(interaction) {
        var typeOfDeath = Math.floor(Math.random() * 2);
        const deathMessages = death.deathmessages[typeOfDeath]
        const victim = interaction.options.getUser('victim');
        var todString = "";
        console.log(typeOfDeath)

        switch (typeOfDeath) {
            case 0:
                todString = "player"
                break;
            case 1:
                todString = "general"
                break;
        }

        console.log(todString + "\n" + victim.id)
        var deathMessage = deathMessages[todString][Math.floor(Math.random() * Object.keys(deathMessages[todString]).length)].text;
        var deathMessage2 = "";

        switch (todString) {
            case "player":
                deathMessage2 = `<@!${victim.id}> ${deathMessage} <@!${interaction.user.id}>`;
                break;
            case "general":
                deathMessage2 = `<@!${victim.id}> ${deathMessage}`;
                break;
        }
        try {
            console.log(deathMessage)
        } catch (error) {
            console.error(error)
        }
        const embed = new MessageEmbed()
            .setTitle('You Died!')
            .setDescription(deathMessage2)
            .setColor('#910700');
        await interaction.reply({embeds: [embed]});
    },
};