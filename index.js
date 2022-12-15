const { Client, GatewayIntentBits, Events, REST, Routes, Collection } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fs = require("fs");
const path = require("node:path")
const Creds = require("../dbot/config.json");
const cmdPath = path.join(__dirname, 'commands');
const cmdFiles = fs.readdirSync(cmdPath).filter(file => file.endsWith('.js'));

client.commands = new Collection();

client.once('ready', () => {
    console.log("\nBot is ready.")
})

let fLoaded = 0;

for (const file of cmdFiles){
    const filePath = path.join(cmdPath, file);
    const command = require(filePath)

    if ('data' in command && 'execute' in command){
        client.commands.set(command.data.name, command)
        fLoaded += 1;
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(`${fLoaded}/${cmdFiles.length} loaded.`);
    }else{
        console.log(`Error in file: ${filePath}. No data or execute found.`)
    }
}

client.on(Events.InteractionCreate, async message => {
    console.log("OOP")
    if (!message.isChatInputCommand()) return;
    const cmd = message.client.commands.get(message.commandName);

    if (!command) return;

    try{
        await command.execute(message, client)
    }catch (error){
        console.error(error);
        await message.reply( { content: `There was an error while executing this command.`, ephemeral: true} )
    }
})

client.login(Creds.login)