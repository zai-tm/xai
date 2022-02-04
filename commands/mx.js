const {SlashCommandBuilder} = require('@discordjs/builders');
const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mx')
        .setDescription('Do stuff with maniaexchange lol')
        .addStringOption(option => option
            .setName('game')
            .setDescription('which game\'s site to use')
            .setRequired(true)
            .addChoice('TrackMania²', 'tm.mania')
            .addChoice('ShootMania', 'sm.mania')
            .addChoice('TrackMania 2020', 'trackmania'))
        .addStringOption(option => option.setName('searchterm').setDescription('Name of the track').setRequired(true)),
    async execute(interaction) {
        var searchString = interaction.options.getString('searchterm');
        var game = interaction.options.getString('game');
        var colour = "#7AD5FF"
        function msToTime(s) {

            // Pad to 2 or 3 digits, default is 2
            function pad(n, z) {
              z = z || 2;
              return ('00' + n).slice(-z);
            }
          
            var ms = s % 1000;
            s = (s - ms) / 1000;
            var secs = s % 60;
            s = (s - secs) / 60;
            var mins = s % 60;
          
            return pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
          }
        if(game === "trackmania") {
            colour = "#6EFA9F"
        } else {
            colour = "#7AD5FF"
        }
        axios.get(`https://${game}.exchange/mapsearch2/search?api=on&trackname=${searchString}`, {headers: {'User-Agent': 'Zai#1113\'s discord bot'}})
        .then((res) => {
            var data = res.data.results[0];
            console.log(
                `${interaction.user.username} searched "${searchString}", first result was ${data.Name} by ${data.Username} (https://${game}.exchange.com/s/tr/${data.TrackID})`
        );
        const desc = data.Comments;
        const regexB = /(\[b])|(\[\/b])/g
        const regexI = /(\[i])|(\[\/i])/g
        const regexU = /(\[u])|(\[\/u])/g
        const regexS = /(\[s])|(\[\/s])/g
        const regexUSER = /(\[user])/g
        const regexUSER2 = /(\[\/user])/g
        const regexALIGNEND = /(\[\/align])/g
        const regexALIGNRIGHT = /(\[align=right])/g
        const regexALIGNCENTER = /(\[align=center])/g
        const regexALIGNLEFT = /(\[align=left])/g
        const regexTRACK = /(\[track])/g
        const regexTRACKSHORT = /(\[track=short])/g
        const regexTRACKFULL = /(\[track=full])/g
        const regexTRACKEND = /(\[\/track])/g
        const regexMAP = /(\[map])/g
        const regexMAPSHORT = /(\[map=short])/g
        const regexMAPFULL = /(\[map=full])/g
        const regexMAPEND = /(\[\/map])/g
        const regexTMX = /(\[tmx])/g
        const regexMX = /(\[mx])/g
        const regexYT = /(\[youtube])|(\[\/youtube])/g
        const regexURL = /\[url=(.+)\](.+)\[\/url\]/g
        var image = `https://${game}.exchange/maps/screenshot/normal/${data.TrackID}`
        var fields = [
            { name: "Difficulty", value: `${data.DifficultyName}`, inline: true },
            { name: "Environment", value: `${data.EnvironmentName}`, inline: true },
            { name: "Vehicle", value: `${data.VehicleName}`, inline: true },
            { name: "TitlePack", value: `${data.TitlePack}`, inline: true },
            { name: "Awards", value: `${data.AwardCount}`, inline: true },
            { name: "World Record", value: `**${msToTime(data.ReplayWRTime)}** by [${data.ReplayWRUsername}](https://${game}.exchange/s/u/${data.ReplayWRUserID})`, inline: true },
        ];
        if(data.ReplayWRTime === null) {
            fields[5] = { name: "World Record", value: "No World Record", inline: true };
        }
        if(game === "sm.mania") {
            fields[5] = {name: "Online Rating" , value: `${Math.floor(data.RatingVoteAverage)}%`, inline: true};
        }
        if(data.HasScreenshot === false) {
            image = `https://${game}.exchange/maps/screenshot/normal/${data.TrackID}`
        } else {
            image = `https://${game}.exchange/maps/${data.TrackID}/image/1`
        }
        const search = new MessageEmbed()
            .setColor(colour)
            .setAuthor(`${data.Username}`,'', `https://${game}.exchange/s/u/${data.UserID}`)
            .setTitle(`${data.Name}`)
            .setDescription(
                desc
                    .replaceAll(regexB, "**")
                    .replaceAll(regexI, "*")
                    .replaceAll(regexS, "~~")
                    .replaceAll(regexALIGNCENTER, "")
                    .replaceAll(regexALIGNRIGHT, "")
                    .replaceAll(regexALIGNEND, "")
                    .replaceAll(regexALIGNLEFT, "")
                    .replaceAll(regexTRACK, `https://${game}.exchange/s/tr/`)
                    .replaceAll(regexTRACKSHORT, `https://${game}.exchange/s/tr/`)
                    .replaceAll(regexTRACKFULL, `https://${game}.exchange/s/tr/`)
                    .replaceAll(regexTRACKEND, "")
                    .replaceAll(regexMAP, `https://${game}.exchange/s/tr/`)
                    .replaceAll(regexMAPSHORT, `https://${game}.exchange/s/tr/`)
                    .replaceAll(regexMAPFULL, `https://${game}.exchange/s/tr/`)
                    .replaceAll(regexMAPEND, "")
                    .replaceAll(regexYT, "")
                    .replaceAll(regexTMX, "TrackmaniaExchange")
                    .replaceAll(regexMX, "ManiaExchange")
                    .replaceAll(regexU, "__")
                    .replaceAll(regexUSER, `https://${game}.exchange/s/u/`)
                    .replaceAll(regexUSER2, "")
                    .replaceAll(regexURL, "[$2]($1)")
                )
            .addFields(fields)
            .setURL(`https://${game}.exchange/s/tr/${data.TrackID}`)
            .setImage(image)
            interaction.reply({embeds: [search]});
        })
        .catch((err) => {
            var length = searchString.length;
            if (length > 249) {
                interaction.reply({content: "No results found for... whatever you searched.\nYou see, if I were to print out exactly what you wanted to search, I would crash.", ephemeral: true});
            } else {
                interaction.reply({content:`No results found for "${searchString}"`, ephemeral: true});
            }
            console.error(err)
        })
    },
};