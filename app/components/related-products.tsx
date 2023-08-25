import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import { type Product } from "~/routes/$category";

type RelatedProductsProps = {
    categorySlug: string;
    excludeProductId: string;
};

type FetcherData = {
    categoryName: string;
    products: Product[];
}

export const RelatedProducts = ({
    categorySlug,
    excludeProductId,
}: RelatedProductsProps) => {
    const fetcher = useFetcher();

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data == null) {
            fetcher.load(`/${categorySlug}`);
        }
    }, [categorySlug, fetcher]);

    const { categoryName, products }: FetcherData = fetcher.data ?? {};

    return (
        <>
            {products?.length ? (
                <div className="border-t border-gray-300 pt-12 mt-12">
                    <h2 className="text-lg font-bold mb-4">
                        Related{" "}
                        <span className="capitalize">{categoryName}</span>{" "}
                        Products
                    </h2>

                    <ul className="grid grid-cols-3 gap-5">
                        {products
                            .filter(
                                (product) => product.id !== excludeProductId
                            )
                            .map((product) => (
                                <li key={product.id}>
                                    <a href={`/product/${product.slug}`}>
                                        {product.name}
                                    </a>
                                </li>
                            ))}
                    </ul>
                </div>
            ) : null}
        </>
    );
};
