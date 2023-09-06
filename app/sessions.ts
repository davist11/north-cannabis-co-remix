// app/sessions.ts
import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno

type SessionData = {
    checkoutId: string;
};

const { getSession, commitSession, destroySession } =
    createCookieSessionStorage<SessionData>({
        // a Cookie from `createCookie` or the CookieOptions to create one
        cookie: {
            name: "__session",
        },
    });

export { getSession, commitSession, destroySession };
