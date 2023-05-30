# HenriBot 🍩

> A bot that tracks stats for the Henri Challenge.

## Resources

- [Current sheet](https://docs.google.com/spreadsheets/d/1_9VKhiAp9E4STmI9wpgV3mRElIXjzxhKiF9BlIiGNWM)

## Setup

### Git clone

Before doing anything, you will have to get your local version of the bot (you will need both [nodeJS](https://nodejs.org/en/) and [git](https://git-scm.com/)). Then :

```sh
git clone https://github.com/amnezziaa/HenriBot.git
cd ./HenriBot/
npm ci
```

### Create your discord bot

You can follow [this page](https://discordjs.guide/preparations/setting-up-a-bot-application.html) from the discord JS documentation.

### Create your google sheet app

You can follow [this tutorial](https://developers.google.com/sheets/api/quickstart/nodejs?hl=fr) from the google sheets API documentation.
Don't forget to download your `credentials.json` file from the API and paste in here.
Note that later on when launching the bot for the first time, you will be required to link an account. This is because the bot needs certain permissions to your account. But for this to work, you'll need to add your google mail to the OAuth consent screen of the app.

### Fill in the .env file

You will need these **values** :

- `DISCORD_BOT_ID` : From the [discord application](https://discord.com/developers/applications) page.
- `DISCORD_TOKEN` : From the [discord application](https://discord.com/developers/applications) page.
- `SHEET_ID` : The literal ID of your sheet URL.
- `SHEET_STARING_DATE` : The date the sheet starts at, formats like : `YYYY/MM/DD`, value from the sheet and in `.env` should be identical.

Once acquired, fill in the `example.env` file and rename it to `.env`.

### Final notice

**Keep in mind that the current setup only works because of my specific sheet organisation and values.**

In fact, the commands are made in the way I designed the bot and google sheet in the first place. If you want the bot to work your way, you will have to either copy my entire sheet setup or create your own and therefore modify the code.

## Documentation

- [Chocobot repository - HenriBot started using the same architecture](https://github.com/amnezziaa/ChocoBot)

### Discord JS

- [General documentation](https://discord.js.org/#/docs/discord.js/main/general/welcome)
- [Slash commands](https://discordjs.guide/slash-commands/response-methods.html#ephemeral-responses)
- [Embeds](https://discordjs.guide/popular-topics/embeds.html#using-the-embed-constructor)

### Google Sheet API

- [Read and write in google sheet cells](https://developers.google.com/sheets/api/guides/values?hl=fr)
- [Google sheet API get method](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get)
- [Google sheet API append method](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append)
- [Google sheet API update method](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/update)
