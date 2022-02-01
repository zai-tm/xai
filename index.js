const fs = require('fs');
const {Intents, Client, Collection} = require('discord.js');
const {token, botOwnerID, activity, activityType} = require('./config.json');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require (`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log("Logged in.");
    client.user.setActivity(activity, { type: activityType });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try { 
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.user.id !== botOwnerID) {
            await interaction.reply({content: 'error moment', ephemeral: true})
        } else {
            await interaction.reply({content: error, ephemeral: true})
        }
        
    }
});

client.login(token);