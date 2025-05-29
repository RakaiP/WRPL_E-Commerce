import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import ProductList from "@/app/components/product-list";
import Container from "@/app/components/ui/container";
import Gallery from "@/app/components/gallery";
import Info from "@/app/components/info";

interface ProductPageProps {
    params: {
        productId: string;
    };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {

    const asyncparams = await params;
    const product = await getProduct(asyncparams.productId);

    // Handle if product is null or undefined
    if (!product) {
        return (
            <div className="bg-white">
                <Container>
                    <div className="px-4 py-10 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-xl font-semibold">Product not found.</h2>
                    </div>
                </Container>
            </div>
        );
    }

    const suggestedProducts = await getProducts({
        categoryId: product?.category?.id,
    });

    return (
        <div className="bg-white">
            <Container>
                <div className="px-4 py-10 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-8">
                        {/* Gallery (Only render if product exists) */}
                        <Gallery images={product.images ?? []} />
                        <div className="mt-10 px-4 sm:mt-16 lg:mt-0 sm:px-0">
                            {/* Info */}
                            <Info data={product} />
                        </div>
                    </div>
                    <hr className="my-10" />
                    <ProductList title="Related Items" items={suggestedProducts} />
                </div>
            </Container>
        </div>
    );
    
    
};

export default ProductPage;
