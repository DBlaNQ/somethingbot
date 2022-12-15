const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song.'),
    async execute(message, client){
        await message.reply(`Pong!`)
    }
}