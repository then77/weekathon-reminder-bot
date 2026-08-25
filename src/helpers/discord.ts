import { REST } from "@discordjs/rest";

const clientId = process.env.DISCORD_CLIENT_ID;
if (!clientId) {
    throw new Error("DISCORD_CLIENT_ID environment variable is required");
}

const token = process.env.DISCORD_TOKEN;
if (!token) {
    throw new Error("DISCORD_TOKEN environment variable is required");
}

export const rest = new REST({ version: "10" }).setToken(token);
