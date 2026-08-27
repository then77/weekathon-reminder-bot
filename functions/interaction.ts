import { handleInteraction } from "@/index";
import { verifyKey } from "discord-interactions";
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
    // Reject non post request
    if (request.method !== "POST") return handle404();

    // Verify interaction request
    const publicKey = process.env.DISCORD_PUBLIC_KEY;
    if (!publicKey) {
        throw new Error("DISCORD_PUBLIC_KEY environment variable is required");
    }

    const rawBody = await request.text();
    const signature = request.headers.get("x-signature-ed25519");
    const timestamp = request.headers.get("x-signature-timestamp");

    if (!signature || !timestamp) {
        return handle404();
    }
    
    if (!(await verifyKey(rawBody, signature, timestamp, publicKey))) {
        return Response.json(
            { message: "Invalid interaction request." },
            { status: 400 },
        );
    }

    return Response.json(await handleInteraction(JSON.parse(rawBody)));
};
