const {SlashCommandBuilder} = require('@discordjs/builders');
const {createConnection} = require('mysql')
const {mysqlUser,mysqlPass,mysqlDB,botOwnerID} = require('../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tag')
        .setDescription('the tag')
        .addSubcommand(subcommand => subcommand
            .setName('create')
            .setDescription('create a tag')
            .addStringOption(option => option.setName('name').setDescription('Name of the tag').setRequired(true))
            .addStringOption(option => option.setName('content').setDescription('Content of the tag').setRequired(true))
        )
        .addSubcommand(subcommand => subcommand
            .setName('display')
            .setDescription('display a tag')
            .addStringOption(option => option.setName('name').setDescription('Name of the tag').setRequired(true))
        )
        .addSubcommand(subcommand => subcommand
            .setName('delete')
            .setDescription('delete a tag')
            .addStringOption(option => option.setName('name').setDescription('Name of the tag').setRequired(true))
        )
        .addSubcommand(subcommand => subcommand
            .setName('edit')
            .setDescription('edit a tag')
            .addStringOption(option => option.setName('name').setDescription('Name of the tag').setRequired(true))
            .addStringOption(option => option.setName('content').setDescription('Content of the tag').setRequired(true))
        )
        .addSubcommand(subcommand => subcommand
            .setName('info')
            .setDescription('display info about a tag')
            .addStringOption(option => option.setName('name').setDescription('Name of the tag').setRequired(true))
        )
        .addSubcommand(subcommand => subcommand
            .setName('list')
            .setDescription('list all tags')
        ),
    async execute(interaction) {
        var subcommand = interaction.options.getSubcommand();
        var name = interaction.options.getString('name');
        var content = interaction.options.getString('content');
        const database = createConnection({
            supportBigNumbers: true,
            host: 'localhost',
            user: mysqlUser,
            password: mysqlPass,
            database: mysqlDB,
        });
        database.connect(err => {
            if (err) throw err;
        });
        switch (subcommand) {
            case 'create':
                database.query(`select exists(select name from tags where name='${name.toLowerCase().replaceAll("'", "\\'")}')`, function (err, result, fields) {
                    if (err) throw err;
                    try {
                        if (result[0][`exists(select name from tags where name='${name.toLowerCase().replaceAll("'", "\\'")}')`] == 1) {
                            interaction.reply(`Tag **${name}** already exists`);
                        } else {
                            if (name.length > 50 || content.length > 1000) {
                                interaction.reply(`Tag name or content is too long`);
                                } else {
                                    database.query(`insert into tags (name,content,username,userid) values ('${name.toLowerCase().replaceAll("'", "\\'")}','${content.replaceAll("'", "\\'")}','${interaction.user.tag}',${interaction.user.id})`, function (err, result, fields) {
                                        if (err) throw err;
                                        interaction.reply(`Tag **${name}** created!`);
                            });
                        }
                    }
                        /*
                        if (name.length > 50 || content.length > 1000) {
                            interaction.reply('Tag name or content is too long');
                        } else {
                            database.query(`insert ignore into tags (name, content, userID, username) values ('${name.toLowerCase()}', '${content}', ${interaction.user.id}, '${interaction.user.tag}')`, function (err, result, fields) {
                                if (err) throw err;
                                interaction.reply(`Tag **${name}** created.`);
                            });
                        }*/
                    } catch (error) {
                        console.error(error);
                        /*
                        console.log(JSON.stringify(result));
                        interaction.reply(`Tag **${name}** already exists.`);
                        if (name.length > 50 || content.length > 1000) {
                            interaction.reply('Tag name or content is too long');
                        }
                    }*/
                    }
                });
                break;
            case 'display':
                database.query(`select content from tags where name='${name.toLowerCase().replaceAll("'", "\\'")}'`, function (err, result, fields) {
                    if (err) throw err;
                    try {
                        interaction.reply(`${result[0].content}`);
                    } catch (error) {
                        interaction.reply(`Tag **${name}** does not exist.`);
                    }
                });
                break;
            case 'delete':
                database.query(`select userid from tags where name='${name.toLowerCase()}'`, function (err, result, fields) {
                    if (err) throw err;
                    try {
                        if (interaction.user.id === botOwnerID) {
                            database.query(`delete from tags where name='${name.toLowerCase()}'`, function (err, result, fields) {
                                if (err) throw err;
                                interaction.reply(`Tag **${name}** deleted.`);
                            });
                        } else if (result[0].userid !== interaction.user.id) {
                            interaction.reply(`You can't delete **${name}** because you didn't create it.`);
                        } else {
                            database.query(`delete from tags where name='${name.toLowerCase()}'`, function (err, result, fields) {
                                if (err) throw err;
                                interaction.reply(`Tag **${name}** deleted.`);
                            });
                        }
                    } catch (error) {
                        console.log('tag doesn\'t exist');
                    }
                });
                break;
            case 'edit':
                database.query(`select * from tags where name='${name.toLowerCase().replaceAll("'", "\\'")}'`, function (err, result, fields) {
                    if (err) throw err;
                    try {
                        if (result[0].userid !== interaction.user.id) {
                            interaction.reply(`You can't edit **${name}** because you didn't create it.`);
                        } else {
                            if (name.length > 50 || content.length > 1000) {
                                interaction.reply('Tag name or content is too long');
                            } 
                            database.query(`update tags set content='${content.replaceAll("'", "\\'")}' where name='${name.toLowerCase().replaceAll("'", "\\'")}'`, function (err, result, fields) {
                                if (err) throw err;
                                interaction.reply(`Tag **${name}** edited.`);
                            });
                        }
                    } catch (error) {
                        interaction.reply(`Tag **${name}** does not exist.`);
                    }
                });
                break;
            case 'info':
                database.query(`select username,userid from tags where name='${name.toLowerCase()}'`, function (err, result, fields) {
                    if (err) throw err;
                    try {
                        interaction.reply(`Tag **${name}** was created by **${result[0].username}** (\`${result[0].userid}\`).`);
                    } catch (error) {
                        interaction.reply(`Tag **${name}** does not exist.`);
                    }
                });
                break;
            case 'list':
                database.query(`select name from tags`, function (err, result, fields) {
                    if (err) throw err;
                    try {
                        interaction.reply(`Tag list has moved here: http://zai-tm.ml/tags.php`);
                    } catch (error) {
                        interaction.reply(`No tags found.`);
                    }
                });
        }
    },
};