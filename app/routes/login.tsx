import { type V2_MetaFunction, type LoaderFunction, json } from "@remix-run/node";
import { useGoogleLogin } from "@react-oauth/google";
import { useLoaderData } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
    return [{ title: "Login" }];
};

export const loader: LoaderFunction = async () =>
    json({
        ENV: {
            GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
        },
    });

export default function Login() {
    const { ENV } = useLoaderData();

    const login = useGoogleLogin({
        redirect_uri: ENV.GOOGLE_REDIRECT_URI,
        ux_mode: "redirect",
        flow: "auth-code",
    });

    console.log({ redirectUri: ENV.GOOGLE_REDIRECT_URI });

    return (
        <div className="mx-auto mt-12 flex justify-center">
            <button
                onClick={() => login()}
                className="bg-green-400 p-2 rounded-md"
            >
                Sign in with Google
            </button>
        </div>
    );
}

