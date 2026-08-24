import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(_request: VercelRequest, response: VercelResponse) {
    response.redirect(
        302,
        `https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&scope=applications.commands&integration_type=1`,
    );
}
