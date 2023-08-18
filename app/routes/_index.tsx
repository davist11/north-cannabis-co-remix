import {
    // json,
    type V2_MetaFunction,
    // type LoaderFunction,
} from "@remix-run/node";
// import { useGqlClient } from "~/hooks/use-graphql-client";
// import { GET_RETAILERS } from "~/graphql/retailers";
import { Link } from "@remix-run/react";
import { categories, formatCategoryForDisplay } from "~/helpers/categories";

export const meta: V2_MetaFunction = () => {
    return [
        { title: "North Cannabis Co" },
    ];
};

// export const loader: LoaderFunction = async ({ request, params }) => {
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const client = useGqlClient();

//     const { retailer } = await client.request(GET_RETAILERS, {
//         retailerId: process.env.RETAILER_ID,
//     });

//     return json({ retailer });
// };

export default function Index() {
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
