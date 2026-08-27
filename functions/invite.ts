import { readFile } from "node:fs/promises";
import path from "node:path";

async function handle404() {
    try {
        const html = await readFile(
            path.join(process.cwd(), "public", "404.html"),
            "utf8",
        );
        return new Response(html, {
            status: 404,
            headers: {
                "Content-Type": "text/html; charset=utf-8",
            },
        });
    } catch {
        return new Response(null, { status: 404 });
    }
}

export const fetch = async (request: Request): Promise<Response> => {
    // Check if request not from /callback or not get.
    if (
        new URL(request.url).pathname != "/invite" ||
        request.method !== "GET"
    )
        return handle404();
    
    return Response.redirect(
        `https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&scope=applications.commands&integration_type=1`,
        302,
    );
};
