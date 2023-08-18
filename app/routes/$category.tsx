import {
    json,
    type LoaderFunction,
    type V2_MetaFunction,
} from "@remix-run/node";
import { GET_MENU } from "~/graphql/menu";
import { categories, formatCategoryForDisplay } from "~/helpers/categories";
import { useLoaderData } from "@remix-run/react";
import { ProductList } from "~/components/product-list";
import { getGqlClient } from "~/helpers/graphql";

type Variant = {
    id: string;
    option: string;
    priceRec: number;
};

export type Product = {
    id: string;
    slug: string;
    name: string;
    image: string;
    category: string;
    brand?: {
        name: string;
    };
    variants: Variant[];
    descriptionHtml: string;
    effects: string[];
};

type MenuResponse = {
    menu: {
        products: Product[];
    };
};

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
    const { categoryName } = data;
    return [{ title: `${categoryName} Products` }];
};

export const loader: LoaderFunction = async ({ request, params }) => {
    const client = getGqlClient();

    if (!params.category) {
        return json({ menu: [] });
    }

    const {
        menu: { products },
    }: MenuResponse = await client.request(GET_MENU, {
        retailerId: process.env.RETAILER_ID,
        filter: {
            category: categories[params.category],
        },
        pagination: {
            limit: 15,
            offset: 0,
        },
    });

    const categoryName = formatCategoryForDisplay(
        categories[params.category]
    );

    return json({ categoryName, products });
};

export default function Category() {
    const { categoryName, products } = useLoaderData();

    return (
        <div className="max-w-5xl mx-auto mt-6">
            <h1 className="text-3xl font-bold mb-6 capitalize">
                {categoryName}
            </h1>

            {products.length ? <ProductList products={products} /> : <div>Sorry, no products!</div>}
        </div>
    );
}
