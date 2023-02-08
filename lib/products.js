function stripProduct(product){
    return {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_link,
        description: product.short_description,
        slug: product.slug
    }
}

export async function getProducts(category) {
    const response = await fetch(`http://symfony.premiumwebdesign.ro/api/products/${category}`);
    const products = await response.json();

    return products.map(stripProduct);
}

export async function getProduct(slug) {
    const response = await fetch(`${process.env.API_BASE_URL}/product/${slug}`);
    const product = await response.json();

    return stripProduct(product);
}

export async function getCategories() {
    const response = await fetch(`${process.env.API_BASE_URL}/categories`);

    return await response.json();
}