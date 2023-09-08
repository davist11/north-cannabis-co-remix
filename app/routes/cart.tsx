import {
    json,
    redirect,
    type LoaderFunction,
    type V2_MetaFunction,
} from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { GET_CART } from "~/graphql/checkout";
import { formatPrice, getOrderType } from "~/helpers/cart";
import { getGqlClient } from "~/helpers/graphql";
import { getSession } from "~/sessions";

type CartItem = {
    id: string;
    option: string;
    quantity: number;
    product: {
        slug: string;
        name: string;
    };
};

type PriceSummary = {
    total: number;
};

type CheckoutResponse = {
    checkout: {
        items: CartItem[];
        priceSummary: PriceSummary;
        redirectUrl: string;
        orderType: string;
    };
};

export const meta: V2_MetaFunction = () => {
    return [{ title: "Cart" }];
};

export const loader: LoaderFunction = async ({ request, params }) => {
    const client = getGqlClient();

    const session = await getSession(request.headers.get("Cookie"));
    const checkoutId = session.get("checkoutId");

    if (!checkoutId) {
        return redirect("/");
    }

    const { checkout }: CheckoutResponse = await client.request(GET_CART, {
        retailerId: process.env.RETAILER_ID,
        checkoutId,
    });

    return json({ checkout });
};

export default function Cart() {
    const { checkout } = useLoaderData();

    const {
        items,
        priceSummary,
        redirectUrl,
        orderType,
    }: {
        items: CartItem[];
        priceSummary: PriceSummary;
        redirectUrl: string;
        orderType: string;
    } = checkout;

    return (
        <div className="max-w-5xl mx-auto mt-6">
            <h1 className="text-3xl font-bold mb-6">
                Cart{" "}
                {orderType ? <span className="font-normal text-sm">
                    ({getOrderType(orderType)})
                </span> : null}
            </h1>

            <table className="w-full mb-6">
                <thead>
                    <tr>
                        <th scope="col" className="text-left p-2">
                            Product
                        </th>
                        <th scope="col" className="text-left p-2">
                            Option
                        </th>
                        <th scope="col" className="text-left p-2">
                            Quantity
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td className="p-2">
                                <Link to={`/product/${item.product.slug}`}>
                                    {item.product.name}
                                </Link>
                            </td>
                            <td className="p-2">{item.option}</td>
                            <td className="p-2">{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td
                            colSpan={3}
                            className="border-t border-gray-500 p-2"
                        >
                            <strong className="font-bold">Total:</strong>{" "}
                            {formatPrice(priceSummary.total / 100)}
                        </td>
                    </tr>
                </tfoot>
            </table>

            <a href={redirectUrl} className="bg-green-400 p-2 rounded-md">
                Checkout
            </a>
        </div>
    );
}
