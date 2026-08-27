import { handleSync } from "@/index";
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
    const key = new URL(request.url).searchParams.get("key");
    if (!process.env.USER_SECRET_KEY || key !== process.env.USER_SECRET_KEY) {
        return handle404();
    }

    try {
        const resp = await handleSync();
        return Response.json({
            success: true,
            raw: resp,
        });
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                success: false,
                error,
            },
            { status: 500 },
        );
    }
};
