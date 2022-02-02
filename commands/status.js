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
            .setName('activity-type')
            .setDescription('Activity Type')
            .setRequired(true)
            .addChoice('Playing', 'PLAYING')
            .addChoice('Streaming', 'STREAMING')
            .addChoice('Listening to', 'LISTENING')
            .addChoice('Watching', 'WATCHING')
            .addChoice('Competing in', 'COMPETING'))
        .addStringOption(option => option.setName('activity').setDescription('activity').setRequired(true))
        .addStringOption(option => option
            .setName('status')
            .setDescription('the status')
            .setRequired(true)
            .addChoice('Online', 'online')
            .addChoice('Idle', 'idle')
            .addChoice('Do Not Disturb', 'dnd')
            .addChoice('Invisible', 'invisible'))
        .addStringOption(option => option.setName('link').setDescription('Only used for "WATCHING" activity type.')),
    async execute(interaction) {
        const activityType = interaction.options.getString('activity-type');
        const activity = interaction.options.getString('activity');
        const status = interaction.options.getString('status');
        const link = interaction.options.getString('link');

        const userID = interaction.user.id;

        console.log(interaction.user.id)
        console.log(botOwnerID)

        if (adminID.indexOf(userID) === -1) {
            await interaction.reply({content: 'You\'re not allowed to do this.', ephemeral: true});
            return;
        }

        config.activityType = activityType;
        config.activity = activity;

        //console.log(adminID[1])
        fs.writeFile(configFile, JSON.stringify(config, null, 2), function writeJSON(err) {
            if (err) return console.error(err);
            console.log('Updated config.json');
            console.log(JSON.stringify(config));
        });

        interaction.client.user.setPresence({
            activities: [{
                name: activity, 
                type: activityType,
                url: link 
            }],
                status: status
            });
        await interaction.reply(`set status to ${activityType} ${activity} ${status}`);
    },
};