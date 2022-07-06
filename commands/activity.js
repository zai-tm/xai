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
        .addChoice('Watch Together', 'youtube')
        .addChoice('Poker Night', 'poker')
        .addChoice('Chess In The Park', 'chess')
        .addChoice('Checkers In The Park', 'checkers')
        //.addChoice('Betrayal', 'betrayal')
        //.addChoice('Fishington', 'fishing')
        .addChoice('Letter League', 'lettertile')
        .addChoice('Word Snacks', 'wordsnack')
        //.addChoice('Doodle Crew', 'doodlecrew')
        .addChoice('SpellCast', 'spellcast')
        //.addChoice('Awkword', 'awkwordnew')
        .addChoice('Putt Party', 'puttpartynew')
        .addChoice('Sketch Heads', 'sketchheads')
        .addChoice('Blazing 8s', 'ocho')
        .addChoice('Land-io', 'landio')
        .addChoice('Bobble League', 'bobble')
        .addChoice('AskAway', 'askaway')
        ),
    async execute(interaction) {
        let activityStr = interaction.options.getString('type');
        let activityName;
        // Yes. I am YandereDev. Thanks for asking.
        switch (activityStr) {
            case 'youtube':
                activityName = "Watch Together";
                break;
            case 'poker':
                activityName = "Poker Night";
                break;
            case 'chess':
                activityName = "Chess In The Park";
                break;
            case 'checkers':
                activityName = "Checkers In The Park";
                break;        
            case 'lettertile':
                activityName = "Letter League";
                break;        
            case 'wordsnack':
                activityName = "Word Snacks";
                break;        
            case 'spellcast':
                activityName = "SpellCast";
                break;
            case 'puttpartynew':
                activityName = "Putt Party";
                break;
            case 'sketchheads':
                activityName = "Sketch Heads";
                break;
            case 'ocho':
                activityName = "Blazing 8s";
                break;
            case 'landio':
                activityName = "Land-io";
                break;
            case 'bobble':
                activityName = "Bobble League";
                break;
            case 'askaway':
                activityName = "Ask Away";
                break;
        }

        const myApps = {
            landio: '903769130790969345',
            bobble: '947957217959759964',
            puttpartynew: "945737671223947305",
            askaway: "976052223358406656"
            //awkwordnew: "879863881349087252",
        }

        interaction.client.discordTogether = new DiscordTogether(interaction.client, myApps);

        console.log(interaction.member.voice.channel);
        if(interaction.member.voice.channel !== null) {
            interaction.client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, activityStr).then(async invite => {
                return interaction.reply(`[${activityName}](${invite.code})`);
            });
        } else {
            interaction.reply({content:"You are not in a voice channel.",ephemeral:"true"});
        }
    },
};
