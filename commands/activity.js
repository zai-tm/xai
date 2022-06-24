const {SlashCommandBuilder} = require('@discordjs/builders');
const { DiscordTogether } = require('discord-together');
const { CommandInteractionOptionResolver } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('activity')
    .setDescription('Games require at least level 1 or level 2 (Some May Not Work)')
    .addStringOption(option => option
        .setName('type')
        .setDescription('Activity Type')
        .setRequired(true)
        .addChoice('YouTube', 'youtube')
        .addChoice('Poker', 'poker')
        .addChoice('Chess In The Park', 'chess')
        .addChoice('Checkers In The Park', 'checkers')
        .addChoice('Betrayal', 'betrayal')
        .addChoice('Fishington', 'fishing')
        .addChoice('Letter Tile', 'lettertile')
        .addChoice('Words Snack', 'wordsnack')
        //.addChoice('Doodle Crew', 'doodlecrew')
        .addChoice('SpellCast', 'spellcast')
        .addChoice('Awkword', 'awkword')
        .addChoice('Puttparty', 'puttparty')
        .addChoice('Sketchheads', 'sketchheads')
        .addChoice('Ocho', 'ocho')
        .addChoice('Landio', 'landio')
        .addChoice('Bobble League', 'bobble')
        )
    .addStringOption(option => option
        .setName('channel_id')
        .setDescription('set channel id')
        ),
    async execute(interaction) {
        let activityStr = interaction.options.getString('type');
        let channelId = interaction.options.getString('channel_id');

        const myApps = {
            landio: '903769130790969345',
            bobble: '947957217959759964'
        }

        interaction.client.discordTogether = new DiscordTogether(interaction.client, myApps);

        if (!channelId) {
            if(interaction.member.voice.channel != null) {
                interaction.client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, activityStr).then(async invite => {
                    return interaction.reply(`${invite.code}`);
                });
            } else {
                interaction.reply({content:"You are not in a voice channel. Please use the `channel_id` option to set the channel.",ephemeral:"true"});
            }
        } else {
            try {
                interaction.client.discordTogether.createTogetherCode(channelId, activityStr).then(async invite => {
                    return interaction.reply(`${invite.code}`);
                });
            } catch (e) {
                interaction.reply({content:"Invalid channel ID",ephemeral:"true"});
            }
        }
    },
};
