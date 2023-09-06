import {
    json,
    type V2_MetaFunction,
    type LoaderFunction,
} from "@remix-run/node";
import { GET_RETAILERS } from "~/graphql/retailers";
import { Link, useLoaderData } from "@remix-run/react";
import { categories, formatCategoryForDisplay } from "~/helpers/categories";
import { getGqlClient } from "~/helpers/graphql";

// TODO better type
type RetailersResponse = {
    retailers: any[];
};

export const meta: V2_MetaFunction = () => {
    return [
        { title: "North Cannabis Co" },
    ];
};

export const loader: LoaderFunction = async ({ request, params }) => {
    const client = getGqlClient();

    const { retailers }: RetailersResponse = await client.request(
        GET_RETAILERS
    );

    return json({ retailers });
};

export default function Index() {
    const { retailers } = useLoaderData();
    console.log({ retailers });

    return (
        <div className="max-w-5xl mx-auto mt-6">
            <ul className="grid grid-cols-3 gap-2 text-center">
                {Object.entries(categories).map(([key, value]) => (
                    <li key={key}>
                        <Link
                            to={key}
                            className="block px-3 py-6 bg-gray-200 capitalize"
                        >
                            {formatCategoryForDisplay(value)}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
