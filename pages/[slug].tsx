import type {NextPage} from "next";
import Image from "next/image";
import {dehydrate, QueryClient, useQuery, useQueryClient} from "react-query";
import {useRouter} from "next/router";
import {getCategories, getProducts} from '../lib/products'
import Link from "next/link";

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

type ProductsData = {
    id: string;
    name: string;
    image_link: string;
    slug: string;
}

const fetchData = async (data: any): Promise<ProductsData> => {
    const slug = data.queryKey[1];
    const res = await fetch(`http://symfony.premiumwebdesign.ro/api/products/${slug}`);
    return res.json();
};

const Category: NextPage = () => {
    const router = useRouter();
    const {slug} = router.query;

    const {isLoading, error, data, status} = useQuery<ProductsData>(["produs", slug], fetchData);

    if (isLoading) return <div>Loading...</div>
    if (!data) return <div>No data!</div>

    return (<>
            <div className={"container"}>
                <div className={"row"}>
                    {   // @ts-ignore
                        data.map((product) => (
                            <div className={"col"} key={product.id}>
                                <Link className="link-product" href={`/produs/${product.slug}`}>
                                    <div className="image-product">
                                        <Image src={product.image_link} alt="" width={"320"} height={"320"}/>
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
    )
}

export default Category;

export async function getStaticProps() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<ProductsData>('product', fetchData);

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}