const {SlashCommandBuilder} = require('@discordjs/builders');
const fs = require('fs');
const configFile = '../config.json';
const config = require(configFile);
const {botOwnerID} = require(configFile);
const adminID = require('./admin_id.json'); 
/* adminID is an array of user IDs. Example:
[
    "12345678901234567",
    "98765432109876543"
]
*/

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('set the status of the bot')
        .addStringOption(option => option
            .setName('verb')
            .setDescription('The verb')
            .setRequired(true)
            .addChoice('Playing', 'PLAYING')
            .addChoice('Streaming', 'STREAMING')
            .addChoice('Listening to', 'LISTENING')
            .addChoice('Watching', 'WATCHING')
            .addChoice('Competing in', 'COMPETING'))
        .addStringOption(option => option.setName('noun').setDescription('The noun').setRequired(true)),
    async execute(interaction) {
        const verb = interaction.options.getString('verb');
        const noun = interaction.options.getString('noun');
        const userID = interaction.user.id;

        console.log(interaction.user.id)
        console.log(botOwnerID)

        if (adminID.indexOf(userID) === -1) {
            await interaction.reply({content: 'You\'re not allowed to do this.', ephemeral: true});
            return;
        }

        config.activityType = verb;
        config.activity = noun;

        //console.log(adminID[1])
        fs.writeFile(configFile, JSON.stringify(config, null, 2), function writeJSON(err) {
            if (err) return console.error(err);
            console.log('Updated config.json');
            console.log(JSON.stringify(config));
        });

        interaction.client.user.setActivity(noun, { type: verb });
        await interaction.reply(`set status to ${verb} ${noun}`);
    },
};