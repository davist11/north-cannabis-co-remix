import {
    json,
    type LoaderFunction,
    type ActionFunction,
    type ActionArgs,
    type V2_MetaFunction,
    redirect,
} from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { GET_PRODUCT } from "~/graphql/product";
import { formatCategoryForDisplay, getCategorySlug } from "~/helpers/categories";
import { formatPrice, orderTypes } from "~/helpers/cart";
import { useState } from "react";
import { ADD_ITEM, CREATE_CHECKOUT } from "~/graphql/checkout";
import { type Product } from "./$category";
import { getGqlClient } from "~/helpers/graphql";
import { RelatedProducts } from "~/components/related-products";
import { getSession, commitSession } from "../sessions";

type ProductResponse = {
    product: Product;
    checkoutId: string;
}

type CreateCheckoutResponse = {
    createCheckout: {
        id: string;
    }
}

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
    const { product } = data;
    return [{ title: product.name }];
};

export const action: ActionFunction = async ({ request }: ActionArgs) => {
    const session = await getSession(request.headers.get("Cookie"));
    const body = await request.formData();
    const productId = body.get("productId");
    const quantity = String(body.get("quantity")) ?? 1;
    const option = body.get("option");
    const orderType = body.get("orderType");

    const client = getGqlClient();

    if (!session.has("checkoutId")) {
        const {
            createCheckout: { id: checkoutId },
        }: CreateCheckoutResponse = await client.request(CREATE_CHECKOUT, {
            retailerId: process.env.RETAILER_ID,
            orderType,
            pricingType: "RECREATIONAL",
        });

        session.set("checkoutId", checkoutId);
    }

    await client.request(ADD_ITEM, {
        retailerId: process.env.RETAILER_ID,
        checkoutId: session.get("checkoutId"),
        productId,
        option,
        quantity: Number.parseInt(quantity),
    });

    return redirect("/cart", {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
};

export const loader: LoaderFunction = async ({ request, params }) => {
    const client = getGqlClient();
    const session = await getSession(request.headers.get("Cookie"));
    const checkoutId = session.get("checkoutId");

    if (!params.slug) {
        return json({ product: [] });
    }

    const { product }: ProductResponse = await client.request(GET_PRODUCT, {
        retailerId: process.env.RETAILER_ID,
        productId: params.slug,
    });

    return json({ product, checkoutId });
};

export default function Product() {
    const { product, checkoutId }: ProductResponse = useLoaderData();
    const displayCategory = formatCategoryForDisplay(product.category);
    const categorySlug = getCategorySlug(product.category)
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="max-w-5xl mx-auto mt-6">
            <div className="flex">
                <div className="mr-6 flex-1">
                    <Link to={`/${categorySlug}`}>
                        Back to{" "}
                        <span className="capitalize">{displayCategory}</span>
                    </Link>
                    <img
                        src={`${product.image}?w=400&fit=crop`}
                        alt=""
                        className="mx-auto"
                        width={400}
                    />
                </div>
                <div className="flex-1">
                    {product.brand?.name ? (
                        <div className="text-xs uppercase">
                            {product.brand.name}
                        </div>
                    ) : null}
                    <h1 className="text-3xl font-bold mb-6">{product.name}</h1>

                    <Form
                        className="mb-6 pb-6 border-b border-gray-200"
                        method="post"
                    >
                        <div className="flex mb-3">
                            <div className="mr-5 pr-5 border-r border-gray-200">
                                <label
                                    htmlFor="option"
                                    className="block font-bold"
                                >
                                    Option
                                </label>
                                <select name="option" id="option">
                                    {product.variants.map((variant) => (
                                        <option
                                            key={variant.id}
                                            value={variant.option}
                                        >
                                            {variant.option} -{" "}
                                            {formatPrice(variant.priceRec)}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="hidden"
                                    name="productId"
                                    value={product.id}
                                />
                            </div>

                            <div className="mr-5 pr-5 border-r border-gray-200">
                                <label
                                    htmlFor="quantity"
                                    className="block font-bold"
                                >
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    max={10}
                                    step={1}
                                    name="quantity"
                                    id="quantity"
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(
                                            Number.parseInt(e.target.value)
                                        )
                                    }
                                />
                            </div>


                            {!checkoutId && <div>
                                <label
                                    htmlFor="orderType"
                                    className="block font-bold"
                                >
                                    Order Type
                                </label>
                                <select name="orderType" id="orderType">
                                    {orderTypes.map(
                                        ({ name, value, selected = false }) => (
                                            <option key={value} value={value} selected={selected}>
                                                {name}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>}
                        </div>
                        <div>
                            <button
                                className="bg-green-400 p-2 rounded-md"
                                type="submit"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </Form>

                    <div
                        className="mb-3"
                        dangerouslySetInnerHTML={{
                            __html: product.descriptionHtml,
                        }}
                    />

                    {product.effects?.length ? (
                        <div className="border-t border-gray-300 mt-6 pt-6">
                            <h2 className="text-xl font-bold mb-2">Effects</h2>
                            <ul className="grid grid-cols-3 gap-5 text-center">
                                {product.effects.map((effect) => (
                                    <li
                                        key={effect}
                                        className="capitalize bg-gray-200 border-gray-400 border p-2"
                                    >
                                        {effect.toLowerCase()}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : null}
                </div>
            </div>

            <RelatedProducts
                categorySlug={categorySlug}
                excludeProductId={product.id}
            />

            {/*
            potentcyCbd
            potentcyThc
            strainType
            variants
             */}
        </div>
    );
}
