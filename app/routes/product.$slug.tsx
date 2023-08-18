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
import { formatPrice } from "~/helpers/cart";
import { useState } from "react";
import { ADD_ITEM, CREATE_CHECKOUT } from "~/graphql/checkout";
import { checkoutCookie } from "~/cookies.server";
import { type Product } from "./$category";
import { getGqlClient } from "~/helpers/graphql";

type ProductResponse = {
    product: Product;
}

type CreateCheckoutResponse = {
    createCheckout: {
        id: string;
    }
}

const isObjectEmpty = (obj: any) =>
    Object.keys(obj).length === 0 && obj.constructor === Object;


export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
    const { product } = data;
    return [{ title: product.name }];
};

export const action: ActionFunction = async ({ request }: ActionArgs) => {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await checkoutCookie.parse(cookieHeader)) || {};

    const body = await request.formData();
    const productId = body.get("productId");
    const quantity = String(body.get("quantity")) ?? 1;
    const option = body.get("option");

    const client = getGqlClient();

    if (isObjectEmpty(cookie)) {
        const {
            createCheckout: { id: checkoutId },
        }: CreateCheckoutResponse = await client.request(CREATE_CHECKOUT, {
            retailerId: process.env.RETAILER_ID,
            orderType: "PICKUP",
            pricingType: "RECREATIONAL",
        });

        cookie.id = checkoutId;
    }

    await client.request(ADD_ITEM, {
        retailerId: process.env.RETAILER_ID,
        checkoutId: cookie.id,
        productId,
        option,
        quantity: Number.parseInt(quantity),
    });

    return redirect("/cart", {
        headers: {
            "Set-Cookie": await checkoutCookie.serialize(cookie),
        },
    });
};

export const loader: LoaderFunction = async ({ request, params }) => {
    const client = getGqlClient();

    if (!params.slug) {
        return json({ product: [] });
    }

    const { product }: ProductResponse = await client.request(GET_PRODUCT, {
        retailerId: process.env.RETAILER_ID,
        productId: params.slug,
    });

    return json({ product });
};

export default function Product() {
    const { product }: ProductResponse = useLoaderData();
    const displayCategory = formatCategoryForDisplay(product.category);
    const categorySlug = getCategorySlug(product.category)
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="max-w-5xl mx-auto mt-6 flex">
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

                <Form className="mb-6" method="post">
                    <div className="flex mb-2">
                        <div className="mr-5">
                            <label htmlFor="option" className="block font-bold">
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
                            <input type="hidden" name="productId" value={product.id} />
                        </div>

                        <div>
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
                                    setQuantity(Number.parseInt(e.target.value))
                                }
                            />
                        </div>
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

            {/*
            potentcyCbd
            potentcyThc
            strainType
            variants
             */}
        </div>
    );
}
