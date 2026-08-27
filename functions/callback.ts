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

async function handlePage(
    requestUrl: string,
    result: true | string,
): Promise<Response> {
    if (result === true) {
        try {
            const html = await readFile(
                path.join(process.cwd(), "public", "callback-success.html"),
                "utf8",
            );

            return new Response(html, {
                status: 200,
                headers: {
                    "Content-Type": "text/html; charset=utf-8",
                },
            });
        } catch {
            return Response.redirect(
                new URL("/callback-success", requestUrl),
                302,
            );
        }
    }

    try {
        const html = await readFile(
            path.join(process.cwd(), "public", "callback-error.html"),
            "utf8",
        );

        return new Response(
            html.replace(
                /<!-- error msg -->[\s\S]*?<!-- end -->/,
                `<!-- error msg -->${result}<!-- end -->`,
            ),
            {
                status: 400,
                headers: {
                    "Content-Type": "text/html; charset=utf-8",
                },
            },
        );
    } catch {
        return Response.redirect(
            new URL(
                `/callback-error?message=${encodeURIComponent(result)}`,
                requestUrl,
            ),
            302,
        );
    }
}

export const fetch = async (request: Request): Promise<Response> => {
    // Check if request not from /callback or not get.
    if (
        new URL(request.url).pathname != "/callback" ||
        request.method !== "GET"
    )
        return handle404();

    // Get code and state from query params
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    if (!code || !state)
        return handlePage(request.url, "Missing code/state. Please try again.");

    // TODO: Link hackatime logic
    return handlePage(request.url, true);
};
