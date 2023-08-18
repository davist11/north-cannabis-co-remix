import type { LinksFunction } from "@remix-run/node";
import {
    Link,
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useNavigation,
} from "@remix-run/react";

import styles from "./tailwind.css";
import { Loader } from "./components/loader";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
    const navigation = useNavigation();

    return (
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
                        <div>
                            <Link to="/cart">Cart</Link>
                        </div>
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
    );
}
