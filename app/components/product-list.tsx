import { Link } from "@remix-run/react"
import { type Product } from "~/routes/$category";

type ProductListProps = {
    products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
    return (
        <ul className="grid grid-cols-3 text-center">
            {products.map((product) => (
                <li key={product.id}>
                    <Link to={`/product/${product.slug}`} className="block">
                        <img
                            src={`${product.image}?w=200&h=200&fit=crop`}
                            alt=""
                            className="mx-auto"
                            height={200}
                            width={200}
                        />
                        <div>{product.name}</div>
                    </Link>
                </li>
            ))}
        </ul>
    );
};
