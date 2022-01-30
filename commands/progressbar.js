const {SlashCommandBuilder} = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message} = require('discord.js');
const wait = require('util').promisify(setTimeout);
//const message = Message
module.exports = {
    data: new SlashCommandBuilder()
        .setName('progressbar')
        .setDescription('Progressbar, as a discord bot minigame!'),
    async execute(interaction) {
        const segments = [
            "🟦",
            //"🟩",
            "🟨",
            "🟥",
            "🟪",
            "⬜", 
        ]
        const control = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('catch')
                .setLabel('Catch')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId('shy')
                .setLabel('Shy away')
                .setStyle('DANGER'),
            new MessageButton()
                .setCustomId('quit')
                .setLabel('Quit')
                .setStyle('SECONDARY')
        );
        const progressbar = [];
        var progress = 0;
        var yellow = 0;
        var theActualSegment = segments[Math.floor(Math.random() * segments.length)]
        const message = await interaction.reply({content: `${theActualSegment}\nYour progress:`, components: [control], fetchReply: true});
        //console.log(message)
        const collector = message.createMessageComponentCollector({ componentType: 'BUTTON', time: 600000});

        collector.on('collect', i => {
            if (i.user.id === interaction.user.id) {
                switch (i.customId) {
                    case 'catch':
                        switch (theActualSegment) {
                            case "🟦":
                                progressbar.push('🟦');
                                progress += 10;
                                theActualSegment = segments[Math.floor(Math.random() * segments.length)]
                                if (progress < 100) {
                                    i.update(`${theActualSegment}\nYour progress: ${progressbar.join('')}`);
                                } else if (progress = 100) {
                                    if (yellow > 0) {
                                        i.update({content: `Bravo!\n${progressbar.join('')}`, components: []});
                                        collector.stop();
                                    } else {
                                        i.update({content: `Perfect!\n${progressbar.join('')}`, components: []});
                                        collector.stop();
                                    }
                                }
                                break;
                            /*case "🟩":
                                progress = 100;
                                yellow = 0;
                                while (progressbar.length < 10) {
                                    progressbar.push('🟦');
                                }
                                wait(500);
                                i.update({content: `Perfect!\n${progressbar.join('')}`, components: []});
                                collector.stop();
                                break;*/
                            case "🟨":
                                progressbar.push('🟨');
                                progress += 10;
                                yellow += 10;
                                theActualSegment = segments[Math.floor(Math.random() * segments.length)]
                                if (progress < 100) {
                                    i.update(`${theActualSegment}\nYour progress: ${progressbar.join('')}`);
                                } else if (progress = 100) {
                                    if (yellow = 100) {
                                        i.update({content: `Nonconformist!\n${progressbar.join('')}`, components: []});
                                    } else {
                                        i.update({content: `Bravo!\n${progressbar.join('')}`, components: []})
                                    }
                                    collector.stop();
                                }
                                break;
                            case "🟥":
                                i.update({content: `You lost! \nYour Progress: ${progressbar.join('')}`, components: []});
                                collector.stop();
                                break;
                            case "🟪":
                                if (progressbar[progressbar.length] == '🟨') {
                                    yellow -= 10;
                                }
                                if (progressbar.length !== 0) {
                                    progress -= 10;
                                    progressbar.pop();
                                }
                                theActualSegment = segments[Math.floor(Math.random() * segments.length)]
                                i.update(`${theActualSegment}\nYour progress: ${progressbar.join('')}`);
                                break;
                            case "⬜":
                                theActualSegment = segments[Math.floor(Math.random() * segments.length)]
                                i.update(`${theActualSegment}\nYour progress: ${progressbar.join('')}`);
                                break;
                        }
                        break;
                    case 'shy':
                        theActualSegment = segments[Math.floor(Math.random() * segments.length)]
                        i.update(`${theActualSegment}\nYour progress: ${progressbar.join('')}`);
                        break;
                    case 'quit':
                        i.update({content: `${interaction.user.username} quit.\nTheir progress: ${progressbar.join('')}`, components: []});
                        collector.stop();
                        break;
                }
            } else {
                i.reply({content: `this is someone else's progressbar`, ephemeral: true});
            }
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
        });
    },
};