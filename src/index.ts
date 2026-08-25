import {
    HTTPInteractionCommands,
    DiscordHTTPSlashError,
} from "discord-http-slash";
import { Routes, type APIInteraction } from "discord-api-types/v10";
import { rest } from "@/helpers/discord";

/** List of imported commands */
import setupCommand from "@/commands/setup";

const commands = new HTTPInteractionCommands([setupCommand]);

export async function handleInteraction(body: { [key: string]: unknown }) {
    try {
        return await commands.handle(body as APIInteraction);
    } catch (error) {
        if (error instanceof DiscordHTTPSlashError) {
            return error.toErrorResponse();
        }
        throw error;
    }
}

export function handleSync() {
    console.log(
        Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!),
        commands.toJSON(),
    );
    return rest.put(
        Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!),
        { body: commands.toJSON() },
    );
}
