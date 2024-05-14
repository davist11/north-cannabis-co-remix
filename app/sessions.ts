import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
    checkoutId: string;
};

const { getSession, commitSession, destroySession } =
    createCookieSessionStorage<SessionData>({
        cookie: {
            name: "__session",
            secrets: [process.env.COOKIE_SECRET as string],
        },
    });

export { getSession, commitSession, destroySession };
