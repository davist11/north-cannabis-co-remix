import { type V2_MetaFunction, type LoaderFunction, json } from "@remix-run/node";
import { useGoogleLogin } from "@react-oauth/google";
import { useLoaderData } from "@remix-run/react";
import { v4 as uuidv4 } from "uuid";

export const meta: V2_MetaFunction = () => {
    return [{ title: "Login" }];
};

export const loader: LoaderFunction = async () =>
    json({
        ENV: {
            GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
            AUTH_URI: process.env.AUTH_URI,
        },
    });

export default function Login() {
    const { ENV } = useLoaderData();

    const login = useGoogleLogin({
        redirect_uri: ENV.GOOGLE_REDIRECT_URI,
        ux_mode: "redirect",
        flow: "auth-code",
        state: uuidv4(),
    });

    return (
        <div className="mx-auto mt-12">
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => login()}
                    className="bg-green-400 p-2 rounded-md"
                >
                    Sign in with Google
                </button>
            </div>
            <div className="flex justify-center">
                <form method="post" action={ENV.AUTH_URI}>
                    <input type="hidden" name="_csrf" value={uuidv4()} />
                    <button
                        type="submit"
                        className="bg-blue-400 p-2 rounded-md"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
}

