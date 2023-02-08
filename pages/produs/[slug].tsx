import {getProduct, getProducts} from '../../lib/products'
import Link from "next/link";
import Image from "next/image";

export async function getStaticPaths() {
    const products = await getProducts("porti-fier-forjat");

    return {
        // @ts-ignore
        paths: products.map((product) => ({
            params: {slug: product.slug.toString()}
        })),
        fallback: 'blocking'
    }
}
// @ts-ignore
export async function getStaticProps({params: {slug}}) {
    const product = await getProduct(slug);

    return {
        props: {product},
        revalidate: 30,
    };
}
// @ts-ignore
function ProductPage({product}) {
    return (
        <>
            <div className={"container"}>
                <div className={"row"}>
                    <div className="col-imagine-produs">
                        <Image src={product.image} alt="" width={"640"} height={"640"}/>
                    </div>
                    <div className="col-text-produs">
                        <div className="name-product">
                            {product.name}
                        </div>
                        <div className="price-product">
                            <span className={"current-price"}>{product.price} RON </span>
                            <span
                                className={"old-price"}>{ // @ts-ignore
                                    parseInt(product.price) + parseInt(product.price * 0.2)} RON </span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        { product.description }
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductPage;