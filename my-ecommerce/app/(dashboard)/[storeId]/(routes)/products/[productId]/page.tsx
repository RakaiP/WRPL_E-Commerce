import prismadb from "@/lib/prismadb";
import { ProductsForm } from "./components/products-form";

const ProductsPage = async ({
    params
} : {
    params: {
        productId: string;
        storeId: string;
    }

}) => {

    const asyncparams = await params;
    const products = await prismadb.product.findUnique({
        where: {
            id: asyncparams.productId
        },
        include:{
            images: true,
        }
    });

    const categories = await prismadb.category.findMany({
        where: {
            storeId: asyncparams.storeId
        }
    });

    const sizes = await prismadb.size.findMany({
        where: {
            storeId: asyncparams.storeId
        }
    });

    const colors = await prismadb.color.findMany({
        where: {
            storeId: asyncparams.storeId
        }
    });

    return ( 
        <div>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductsForm 
                initialData={products}
                categories={categories}
                sizes={sizes}
                colors={colors}
                
                ></ProductsForm>
            </div>
        </div>
     );
}
 
export default ProductsPage;