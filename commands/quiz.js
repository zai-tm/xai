const {SlashCommandBuilder} = require('@discordjs/builders');
const { MessageButton, MessageActionRow, MessageEmbed } = require('discord.js');
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
        const failMessages = [
            "You're wrong.",
            "I bet you unironically think 9+10 is 21.",
            "I'm disappointed in you.",
            "Have you been living under a rock?",
            // stuartt
            "I hope both sides of your pillow are warm.",
            "99% of people got that question right.",
        ]
        const winMessages = [
            "You're right.",
            "I would give you some Progress Credit:tm: if I could.",
            "You're a true Progressbar95 fan.",
            "You should get promoted to Owner.",
            "You finally did it! You reached pink colour!",
            "Was that the brain of 87?"
        ]

        const timeoutMessages = [
            "Hello, anyone there?",
            "Imagine you were disarming a bomb instead of answering a question.",
            "You're not even trying.",
            // logan
            "my dementia ridden grandfather can respond faster than you.",
            // stuartt
            "my hot pockets are ready.",
            //lol guy
            "Your food's getting cold."

        ]

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

        function randomMessage(array) {
            Math.floor(Math.random() * array.length);
            return array[Math.floor(Math.random() * array.length)];
        }
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
        const questionEmbed = new MessageEmbed()
            .setTitle(question)
            .setColor('#007f7f')
            .setFooter(`You have ${questions[random].time/1000} seconds to answer.`)
        const message = await interaction.reply({embeds: [questionEmbed], components: [answerButtons], fetchReply: true});
        const collector = message.createMessageComponentCollector({ componentType: 'BUTTON', time: questions[random].time});
        collector.on('collect', i => {
                if (i.user.id === interaction.user.id) {
                if (i.component.customId === 'answer_correct') {
                    answerCorrectButton.setStyle('SUCCESS').setDisabled(true);
                    answerWrong1Button.setStyle('SECONDARY').setDisabled(true);
                    answerWrong2Button.setStyle('SECONDARY').setDisabled(true);
                    answerWrong3Button.setStyle('SECONDARY').setDisabled(true);
                    let answerButtonFinished = new MessageActionRow().addComponents(answers);
                    let questionEmbedFinished = new MessageEmbed()
                        .setTitle(question)
                        .setDescription(randomMessage(winMessages))
                        .setColor('#007f00')
                        .setFooter(`You answered correctly!`)
                    i.update({embeds: [questionEmbedFinished], components: [answerButtonFinished]})
                    collector.stop();
                } else {
                    questionEmbedFinished = new MessageEmbed()
                        .setTitle(question)
                        .setDescription(randomMessage(failMessages))
                        .setColor('#7f0000')
                        .setFooter(`You answered incorrectly!`)
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
                    i.update({embeds: [questionEmbedFinished], components: [answerButtonFinished]})
                    collector.stop();
                }
            } else {
                i.reply({content: 'This is not your question.', ephemeral: true})
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                questionEmbedFinished = new MessageEmbed()
                    .setTitle(question)
                    .setDescription(randomMessage(timeoutMessages))
                    .setColor('#7f7f00')
                    .setFooter(`You ran out of time!`)
                answerCorrectButton.setStyle('SUCCESS').setDisabled(true);
                answerWrong1Button.setStyle('SECONDARY').setDisabled(true);
                answerWrong2Button.setStyle('SECONDARY').setDisabled(true);
                answerWrong3Button.setStyle('SECONDARY').setDisabled(true);
                let answerButtonFinished = new MessageActionRow().addComponents(answers);
                interaction.editReply({embeds: [questionEmbedFinished], components: [answerButtonFinished]})
            } else {
                return;
            }
        });
    },
};