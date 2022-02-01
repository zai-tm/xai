# xai
the bot i made for the progressbar95 discord

# config.js

The bot requires a file called `config.json` to run. 

Copy the file `config-template.json` and rename it to `config.json` and replace all of the template information with your own information.

Here is a table for what each of the items mean.

| JSON Key     | Description                                                                                         | How to get it                                                                                                                                      | Example                                                              |
|--------------|-----------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------|
| botOwnerID   | Your Discord User ID. Required for some commands.                                                   | [Where can i find my User/Server/Message ID?](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-) | 284804878604435476                                                   |
| token        | Your Bot's Token. Required for the bot to login.                                                    | Go to your bot's page on the Discord Developer Page, Go to the "Bot" Tab, Click the "Copy' Button.                                                 | NzI1ODUxOTMzMjA5Nzg4NDQ4.XvUwSg.oiS1YI3ujhu3jz70qd2-kZJOTUs          |
| clientID     | Your Bot's client ID. Required to register your bot's commands.                                     | Go to your bot's page on the Discord Developer Page, Go to the "General Information" Tab, Click the "Copy" Button where it says "Application ID"   | 725851933209788448                                                   |
| guildID      | Your "Testing Server".  Required for loading the bot's command on only one server, but not globaly. | [Where can i find my User/Server/Message ID?](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-) | 835625916922986556                                                   |
| webhookId    | The ID for your Discord Webhook. Required for the /suggest command.                                 | Create a new webhook, copy the webhook URL, copy the part after `webhooks/`                                                                        | 854531644504932352                                                   |
| webhookToken | The token for your Discord Webhook. Required for the /suggest command.                              | Create a new webhook, copy the part after `webhooks/[WEBHOOK-ID]`                                                                                  | 5gdlXCSrANZhv3y0qBBNXGu0ZqiTF17ikRASyp5nBv8V3ty1BD_n_fpAfkPrtbEDLri7 |
| mysqlUser    | Required for the /tag command.                                                                      |                                                                                                                                                    |                                                                      |
| mysqlPass    | Required for the /tag command.                                                                      |                                                                                                                                                    |                                                                      |
| mysqlDB      | Required for the /tag command.                                                                      |                                                                                                                                                    |                                                                      |
| activityType | They type of activity your bot will use. Used for the bot's status.                                 | Valid options are `PLAYING`, `WATCHING`, `LISTENING`, `COMPETING`. (There's also `STREAMING`, but it won't probably work)                          | WATCHING                                                             |
| activity     | The game your bot is playing. used for the bot's status.                                            | Use your imagination!                                                                                                                              | your every move.                                                     |

# Building and Running

This bot uses Node.js, so make sure you have that first ([you can get Node from here](https://nodejs.org/en/)).

In your terminal of choice, Download all modules by running `npm i`. 

Run the bot by running `run.bat` (or `run-no-g.bat` to only initilize the bot for a singular guild and not globally.)

To remove your commands, run `remove-commands.bat`.