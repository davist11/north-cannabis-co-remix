import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
    checkoutId: string;
};

const { getSession, commitSession, destroySession } =
    createCookieSessionStorage<SessionData>({
        cookie: {
            name: "__session",
        },
    });

export { getSession, commitSession, destroySession };
