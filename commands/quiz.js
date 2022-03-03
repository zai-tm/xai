const {SlashCommandBuilder} = require('@discordjs/builders');
const { MessageButton, MessageActionRow } = require('discord.js');
let quiz = require('./quiz.json')
const questions = quiz.questions

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quiz')
        .setDescription('progressbar95 quiz'),
    async execute(interaction) {
        const random = Math.floor(Math.random() * Object.keys(questions).length);
        const question = questions[random].question;
        const answerCorrect = questions[random].answerCorrect;
        const answerWrong1 = questions[random].answerWrong1;
        const answerWrong2 = questions[random].answerWrong2;
        const answerWrong3 = questions[random].answerWrong3;

        const answerCorrectButton = new MessageButton()
            .setCustomId('answer_correct')
            .setLabel(answerCorrect)
            .setStyle('SECONDARY');
        const answerWrong1Button = new MessageButton()
            .setCustomId('answer_wrong1')
            .setLabel(answerWrong1)
            .setStyle('SECONDARY');
        const answerWrong2Button = new MessageButton()
            .setCustomId('answer_wrong2')
            .setLabel(answerWrong2)
            .setStyle('SECONDARY');
        const answerWrong3Button = new MessageButton()
            .setCustomId('answer_wrong3')
            .setLabel(answerWrong3)
            .setStyle('SECONDARY');


        let answers = [
            answerCorrectButton,
            answerWrong1Button,
            answerWrong2Button,
            answerWrong3Button
        ];
        function shuffle(array) {
            let currentIndex = array.length,  randomIndex;
                while (currentIndex != 0) {
                  randomIndex = Math.floor(Math.random() * currentIndex);
                  currentIndex--;
                  [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
                }
                return array;
        }
        
        shuffle(answers)
        const answerButtons = new MessageActionRow()
            .addComponents(answers);
        const message = await interaction.reply({content: question+'\nyou have '+questions[random].time/1000+' seconds to answer', components: [answerButtons], fetchReply: true});
        const collector = message.createMessageComponentCollector({ componentType: 'BUTTON', time: questions[random].time});
        collector.on('collect', i => {
            if (i.component.customId === 'answer_correct') {
                answerCorrectButton.setStyle('SUCCESS').setDisabled(true);
                answerWrong1Button.setStyle('SECONDARY').setDisabled(true);
                answerWrong2Button.setStyle('SECONDARY').setDisabled(true);
                answerWrong3Button.setStyle('SECONDARY').setDisabled(true);
                let answerButtonFinished = new MessageActionRow().addComponents(answers);
                i.update({content: question+'\ngood job. no insult because you answered correctly', components: [answerButtonFinished]})
                collector.stop();
            } else {
                switch (i.component.customId) {
                    case 'answer_wrong1':
                        answerCorrectButton.setStyle('SUCCESS').setDisabled(true);
                        answerWrong1Button.setStyle('DANGER').setDisabled(true);
                        answerWrong2Button.setStyle('SECONDARY').setDisabled(true);
                        answerWrong3Button.setStyle('SECONDARY').setDisabled(true);
                        answerButtonFinished = new MessageActionRow().addComponents(answers);
                        break;
                    case 'answer_wrong2':
                        answerCorrectButton.setStyle('SUCCESS').setDisabled(true);
                        answerWrong1Button.setStyle('SECONDARY').setDisabled(true);
                        answerWrong2Button.setStyle('DANGER').setDisabled(true);
                        answerWrong3Button.setStyle('SECONDARY').setDisabled(true);
                        answerButtonFinished = new MessageActionRow().addComponents(answers);
                        break;
                    case 'answer_wrong3':
                        answerCorrectButton.setStyle('SUCCESS').setDisabled(true);
                        answerWrong1Button.setStyle('SECONDARY').setDisabled(true);
                        answerWrong2Button.setStyle('SECONDARY').setDisabled(true);
                        answerWrong3Button.setStyle('DANGER').setDisabled(true);
                        break;
                    }
                answerButtonFinished = new MessageActionRow().addComponents(answers);
                i.update({content: question+'\ni bet you unironically think 9+10 = 21', components: [answerButtonFinished]})
                collector.stop();
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                answerCorrectButton.setStyle('SUCCESS').setDisabled(true);
                answerWrong1Button.setStyle('SECONDARY').setDisabled(true);
                answerWrong2Button.setStyle('SECONDARY').setDisabled(true);
                answerWrong3Button.setStyle('SECONDARY').setDisabled(true);
                let answerButtonFinished = new MessageActionRow().addComponents(answers);
                interaction.editReply({content: question+'\nyou ran out of time. next time, think faster bozo', components: [answerButtonFinished]})
            } else {
                return;
            }
        });
    },
};