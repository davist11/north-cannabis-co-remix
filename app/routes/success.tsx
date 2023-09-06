import {
    json,
    type V2_MetaFunction,
    type LoaderFunction,
} from "@remix-run/node";
import { destroySession, getSession } from "~/sessions";

export const meta: V2_MetaFunction = () => {
    return [{ title: "Success" }];
};

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(request.headers.get("Cookie"));

    return json(
        {
            success: true,
        },
        {
            headers: {
                "Set-Cookie": await destroySession(session),
            },
        }
    );
};

export default function Success() {
    return (
        <div className="max-w-5xl mx-auto mt-6">
            <h1 className="text-3xl font-bold mb-6">Success</h1>

            <p>Thanks for your order.</p>
        </div>
    );
}
