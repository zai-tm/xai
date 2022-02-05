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
            "<a:DataMash:853137832139161630>",
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
        var blue = 0;
        var theActualSegment = segments[Math.floor(Math.random() * segments.length)]
        const message = await interaction.reply({content: `${theActualSegment}\nYour progress:`, components: [control], fetchReply: true});
        //console.log(message)

        function getNextSegment() {
            theActualSegment = segments[Math.floor(Math.random() * segments.length)]
            var greenSegmentChance = Math.floor(Math.random() * 100)
            if (greenSegmentChance === 0) {
                theActualSegment = "🟩"
            }
            return theActualSegment;
        }
        const collector = message.createMessageComponentCollector({ componentType: 'BUTTON', time: 600000});

        collector.on('collect', i => {
            function blueSegment() {
                progressbar.push('🟦');
                progress += 10;
                blue += 10;
                let tube = [
                    '🟦',
                    '🟨',
                    '🟨',
                    '🟨',
                    '🟨',
                    '🟨',
                    '🟨',
                    '🟨',
                    '🟨',
                    '🟦'
                ]
                getNextSegment();
                var isTube = progressbar.length == tube.length && progressbar.every(function(element, index) {
                    return element === zebra[index];
                  });
                if (progress < 100) {
                    i.update(`${theActualSegment}\nYour progress: ${progressbar.join('')}`);
                } else if (progress === 100) {
                    if (yellow > 0) {
                        i.update({content: `Bravo!\n${progressbar.join('')}`, components: []});
                    } else {
                        i.update({content: `Perfect!\n${progressbar.join('')}`, components: []});
                    }
                    collector.stop();
                }
            }
            function greenSegment() {
                progress = 100;
                progressbar.length = 0;
                yellow = 0;
                while (progressbar.length < 10) {
                    progressbar.push('🟦');
                }
                wait(500);
                i.update({content: `Perfect!\n${progressbar.join('')}`, components: []});
                collector.stop();
            }
            function yellowSegment() {
                progressbar.push('🟨');
                progress += 10;
                yellow += 10;
                getNextSegment();
                if (progress < 100) {
                    i.update(`${theActualSegment}\nYour progress: ${progressbar.join('')}`);
                } else if (progress === 100) {
                    // yanderedev moment
                    if (yellow === 100) {
                        i.update({content: `Nonconformist!\n${progressbar.join('')}`, components: []});
                    } else if (blue === 50 && yellow == 50) {
                        i.update({content: `Yin and Yang!\n${progressbar.join('')}`, components: []})
                    } else {
                        i.update({content: `Bravo!\n${progressbar.join('')}`, components: []})
                    }
                    collector.stop();
                }         
            }
            function redSegment() {
                    i.update({content: `You lost! \nYour Progress: ${progressbar.join('')}`, components: []});
                    collector.stop();
            }
            function pinkSegment() {
                if (progressbar[progressbar.length] == '🟨') {
                    yellow -= 10;
                }
                if (progressbar.length !== 0) {
                    progress -= 10;
                    progressbar.pop();
                }
                getNextSegment();
                i.update(`${theActualSegment}\nYour progress: ${progressbar.join('')}`);
            }
            function greySegment() {
                getNextSegment();
                i.update(`${theActualSegment}\nYour progress: ${progressbar.join('')}`);
            }
    
            if (i.user.id === interaction.user.id) {
                switch (i.customId) {
                    case 'catch':
                        switch (theActualSegment) {
                            case "🟦":
                                blueSegment();
                                break;
                            case "🟩":
                                greenSegment();
                                break;
                            case "🟨":
                                yellowSegment();
                                break;
                            case "🟥":
                                redSegment();
                                break;
                            case "🟪":
                                pinkSegment();
                                break;
                            case "⬜":
                                greySegment();
                                break;
                            case "<a:DataMash:853137832139161630>":
                                var random = Math.floor(Math.random() * 5)
                                switch (random) {
                                    case 0:
                                        blueSegment();
                                        break;
                                    case 1:
                                        greenSegment();
                                        break;
                                    case 2:
                                        yellowSegment();
                                        break;
                                    case 3:
                                        redSegment();
                                        break;
                                    case 4:
                                        pinkSegment();
                                        break;
                                    case 5:
                                        greySegment();
                                        break;
                                }
                                break;  
                        }
                        break;
                    case 'shy':
                        getNextSegment();
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