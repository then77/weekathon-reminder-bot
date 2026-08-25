import { SlashCommandBuilder } from "@discordjs/builders";
import {
    ApplicationIntegrationType,
    InteractionContextType,
} from "discord-api-types/v10";
import type { HTTPApplicationCommand } from "discord-http-slash";

export default {
    data: new SlashCommandBuilder()
        .setName("setup")
        .setDescription("Setup and configure your user settings.")
        .setIntegrationTypes(ApplicationIntegrationType.UserInstall)
        .setContexts(
            InteractionContextType.Guild,
            InteractionContextType.BotDM,
            InteractionContextType.PrivateChannel,
        ),
    async execute(interaction) {
        return interaction.reply({
            content: "Coming soon!",
        });
    },
} satisfies HTTPApplicationCommand;
