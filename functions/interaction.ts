import { handleInteraction } from "@/index";
import { verifyKey } from "discord-interactions";

export const fetch = async (request: Request): Promise<Response> => {
    // Reject non post request
    if (request.method !== "POST") {
        return new Response(null, { status: 405 });
    }

    // Verify interaction request
    const publicKey = process.env.DISCORD_PUBLIC_KEY;
    if (!publicKey) {
        throw new Error("DISCORD_PUBLIC_KEY environment variable is required");
    }

    const rawBody = await request.text();
    const signature = request.headers.get("x-signature-ed25519");
    const timestamp = request.headers.get("x-signature-timestamp");

    if (
        !signature ||
        !timestamp ||
        !(await verifyKey(rawBody, signature, timestamp, publicKey))
    ) {
        return new Response("Invalid interaction request.", { status: 400 });
    }

    return Response.json(await handleInteraction(JSON.parse(rawBody)));
};
