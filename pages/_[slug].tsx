import {getCategories, getProducts} from '../lib/products'
import Link from "next/link";
import Image from "next/image";

export async function getStaticPaths() {
    const categories = await getCategories();
    return {
        // @ts-ignore
        paths: categories.map((category) => ({
            params: {slug: category.slug.toString()}
        })),
        fallback: 'blocking'
    }
}
// @ts-ignore
export async function getStaticProps({params: {slug}}) {
    const products = await getProducts(slug);

    return {
        props: {products},
        revalidate: 30,
    };
}

// @ts-ignore
function CategoryPage({products}) {
    // @ts-ignore
    return (
        <>
            <div className={"container"}>
                <div className={"row"}>
                    {   // @ts-ignore
                        products.map((product) => (
                        <div className={"col"} key={product.id}>
                            <Link className="link-product" href={`/produs/${product.slug}`}>
                                <div className="image-product">
                                    <Image src={product.image} alt="" width={"320"} height={"320"}/>
                                </div>
                                <div className="name-product">
                                    {product.name}
                                </div>
                                <div className="price-product">
                                    <span className={"current-price"}>{product.price} RON </span>
                                    <span
                                        className={"old-price"}>{// @ts-ignore
                                            parseInt(product.price) + parseInt(product.price * 0.2)} RON </span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default CategoryPage;