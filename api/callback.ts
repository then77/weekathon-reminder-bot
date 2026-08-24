import { readFile } from "node:fs/promises";
import path from "node:path";
import type { VercelRequest, VercelResponse } from "@vercel/node";

function getQueryValue(value: string | string[] | undefined): string | undefined {
    return Array.isArray(value) ? value[0] : value;
}

async function handlePage(response: VercelResponse, result: true | string): Promise<void> {
    if (result === true) {
        try {
            const html = await readFile(
              path.join(process.cwd(), "public", "callback-success.html"),
              "utf8",
            );

            response
                .status(200)
                .setHeader("Content-Type", "text/html; charset=utf-8")
                .send(html);
            return;
        } catch {
            response.redirect(302, "/callback-success");
            return;
        }
    } else {
        try {
            const html = await readFile(
              path.join(process.cwd(), "public", "callback-error.html"),
              "utf8",
            );

            response
                .status(400)
                .setHeader("Content-Type", "text/html; charset=utf-8")
                .send(
                    html.replace(
                        /<!-- error msg -->[\s\S]*?<!-- end -->/,
                        `<!-- error msg -->${result}<!-- end -->`,
                    ),
                );
            return;
        } catch {
            response.redirect(302, `/callback-error?message=${encodeURIComponent(result)}`);
            return;
        }
    }
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
    // Reject non get request
    if (request.method !== "GET") return handlePage(response, "Request is not valid. Please try again.");
    
    // Get code and state from query params
    const code = getQueryValue(request.query.code);
    const state = getQueryValue(request.query.state);

    if (!code || !state) return handlePage(response, "Missing code/state. Please try again.");

    // TODO: Link hackatime logic
    return handlePage(response, true);
}
