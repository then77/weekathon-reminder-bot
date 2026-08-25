export const fetch = async (): Promise<Response> => {
    return Response.redirect(
        `https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&scope=applications.commands&integration_type=1`,
        302,
    );
};
