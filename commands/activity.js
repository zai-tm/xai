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
        //.addChoice('Awkword', 'awkwordnew')
        .addChoice('Puttparty', 'puttpartynew')
        .addChoice('Sketchheads', 'sketchheads')
        .addChoice('Blazing 8s', 'ocho')
        .addChoice('Landio', 'landio')
        .addChoice('Bobble League', 'bobble')
        ),
    async execute(interaction) {
        let activityStr = interaction.options.getString('type');

        const myApps = {
            landio: '903769130790969345',
            bobble: '947957217959759964',
            puttpartynew: "945737671223947305",
            awkwordnew: "879863881349087252",
        }

        interaction.client.discordTogether = new DiscordTogether(interaction.client, myApps);

        console.log(interaction.member.voice.channel);
        if(interaction.member.voice.channel !== null) {
            interaction.client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, activityStr).then(async invite => {
                return interaction.reply(`${invite.code}`);
            });
        } else {
            interaction.reply({content:"You are not in a voice channel.",ephemeral:"true"});
        }
    },
};
