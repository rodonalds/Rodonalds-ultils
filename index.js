const fs = require('node:fs');
const path = require('node:path');
const { ClientToken } = require('./config.json');

const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        }
    }
}

client.once(Events.ClientReady, readyClient => {
    console.log(`✅ Bot is online!`);
    require('./deploy.js');
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`The command "${interaction.commandName}" does not exist!`);
        return;
    }

    try {
        await command.execute(interaction, interaction.client);
    } catch (error) {
        console.error(`Failed to execute "${interaction.commandName}"!`);
        console.error(error);
    }
});

client.login(ClientToken);