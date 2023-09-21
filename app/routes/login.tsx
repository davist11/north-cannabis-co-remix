import { type V2_MetaFunction, type LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
    return [{ title: "Login" }];
};

export const loader: LoaderFunction = async () =>
    json({
        ENV: {
            AUTH_URI: process.env.AUTH_URI,
        },
    });

export default function Login() {
    const { ENV } = useLoaderData();

    return (
        <div className="mx-auto mt-12">
            <div className="flex justify-center">
                <form method="post" action={ENV.AUTH_URI}>
                    <button
                        type="submit"
                        className="bg-green-400 p-2 rounded-md"
                    >
                        Login with Google
                    </button>
                </form>
            </div>
        </div>
    );
}

