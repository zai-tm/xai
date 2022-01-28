const {SlashCommandBuilder} = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Ask the magic 8-ball a question')
        .addStringOption(option => option.setName('question').setDescription('What do you want to ask?').setRequired(true)),
    async execute(interaction) {
        var question = interaction.options.getString('question')
        //responses shamelessly stolen from wikipedia
        const responses = [
            "It is certain",
            "It is decidedly so",
            "Without a doubt",
            "Yes definitely",
            "You may rely on it",
            "As I see it, yes",
            "Most likely",
            "Outlook good",
            "Yes",
            "Signs point to yes",
            "Reply hazy try again",
            "Ask again later",
            "Better not tell you now",
            "Cannot predict now",
            "Concentrate and ask again",
            "Don't count on it",
            "My reply is no",
            "My sources say no",
            "Outlook not so good",
            "Very doubtful"
        ]
        var length = question.length

        if (length > 255) {
            await interaction.reply({content: 'Your question is too long', ephemeral: true})
        } else {
            await interaction.reply("Shaking the 8-ball...");
            await wait(1500);
            await interaction.editReply("You asked: *" + question + "*\n" + "The 8-ball says: **" + responses[Math.floor(Math.random() * responses.length)] + "**");
        }

    },
};