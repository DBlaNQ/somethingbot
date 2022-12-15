const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const Creds = require("../dbot/config.json")



client.on('ready', () => {
    console.log("Bot is ready.")
})



client.login(Creds.login)
//ahahah