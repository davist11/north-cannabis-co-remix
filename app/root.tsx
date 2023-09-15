import { json, type LinksFunction, type LoaderFunction } from "@remix-run/node";
import {
    Link,
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
    useNavigation,
} from "@remix-run/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import styles from "./tailwind.css";
import { Loader } from "./components/loader";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader: LoaderFunction = async () => json({
    ENV: {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    },
});

export default function App() {
    const navigation = useNavigation();
    const { ENV } = useLoaderData();

    return (
        <GoogleOAuthProvider clientId={ENV.GOOGLE_CLIENT_ID}>
            <html lang="en">
                <head>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width,initial-scale=1"
                    />
                    <Meta />
                    <Links />
                </head>
                <body>
                    <header className="bg-gray-700 text-white p-3 mb-6">
                        <div className="max-w-5xl mx-auto flex justify-between items-center">
                            <Link to="/">North Cannabis Co</Link>
                            <ul className="flex">
                                <li className="border-r border-current mr-3 pr-3">
                                    <Link to="/login" className="block">Login</Link>
                                </li>
                                <li>
                                    <Link to="/cart" className="block">Cart</Link>
                                </li>
                            </ul>
                        </div>
                    </header>

                    <Outlet />

                    <footer className="bg-gray-700 text-white p-3 mt-12 text-center">
                        © {new Date().getFullYear()}
                    </footer>

                    <ScrollRestoration />
                    <Scripts />
                    <LiveReload />

                    {navigation.state === "loading" ? <Loader /> : null}
                </body>
            </html>
        </GoogleOAuthProvider>
    );
}
