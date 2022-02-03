const {SlashCommandBuilder} = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);
const { MessageActionRow, MessageButton} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('crash')
        .setDescription('Crash the bot... maybe'),
    async execute(interaction) {

        const yesNo = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('yes')
                .setLabel('Yes')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId('no')
                .setLabel('No')
                .setStyle('DANGER')
        );

        await interaction.reply({content: 'Are you sure?\nYou have 10 seconds.', components: [yesNo], fetchReply: true});
        await wait(10000);
        await interaction.editReply({content: 'Timed out', components: []});
        const collector = interaction.message.createMessageComponentCollector({ componentType: 'BUTTON', time: 10000});
            collector.on('collect', i => {
                if (i.user.id === interaction.user.id) {
                    switch (i.customId) {
                        case 'yes':
                            i.update({content: 'Crashing the bot in 3...', components: []})
                            wait(1000)
                            i.update('Crashing the bot in 2...')
                            wait(1000)
                            i.update('Crashing the bot in 1...')
                            wait(1000)
                            i.update(`${interaction.user.username} is not in the sudoers file. This incident will be reported.`)
                            break;
                        case 'no':
                            i.update({content: ':D', components: []})
                        
                    }
                }
            })
    },
};