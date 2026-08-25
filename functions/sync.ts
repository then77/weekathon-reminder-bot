import { handleSync } from "@/index";

export const fetch = async (request: Request): Promise<Response> => {
    const key = new URL(request.url).searchParams.get("key");
    if (!process.env.USER_SECRET_KEY || key !== process.env.USER_SECRET_KEY) {
        return Response.json(
            { error: "This feature is temporarily unavailable." },
            { status: 400 },
        );
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
