import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import getColors from "@/actions/get-colors";
import getCategory from "@/actions/get-category";
import Container from "@/app/components/ui/container";
import Billboard from "@/app/components/billboard";
import Filter from "./components/filter";
import NoResults from "@/app/components/ui/no-results";
import MobileFilters from "./components/mobile-filter";
import ProductCard from "@/app/components/ui/product-card";


export const revalidate = 0;

interface CategoryPageProps{
    params :{
        categoryId: string;
    },
    searchParams:{
        colorId : string;
        sizeId : string;
    }
}

const CategoryPage : React.FC<CategoryPageProps> = async ({
    params,
    searchParams
}) => {
    const asyncparams = await params;
    const asearchParams = await searchParams; 

    const products = await getProducts({
        categoryId: asyncparams.categoryId,
        colorId: asearchParams.colorId,
        sizeId: asearchParams.sizeId
    });

    
    const sizes = await getSizes();
    const colors = await getColors();
    const category = await getCategory(asyncparams.categoryId);

    return ( 
        <div className="bg-white">
            <Container>
                <Billboard
                    data={category.billboard}/>
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        <MobileFilters sizes={sizes} colors={colors}/>
                        <div className="hidden lg:block">
                            <Filter 
                            valueKey="sizeId"
                            name="Sizes"
                            data={sizes}
                            />
                            <Filter 
                            valueKey="colorId"
                            name="Colors"
                            data={colors}
                            />
                        </div>
                        <div className="mt-6 lg:col-span-4 lg:mt-0">
                            {products.length === 0 && <NoResults/> }
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
                                {products.map((item) => (
                                    <ProductCard
                                    key={item.id}
                                    data={item}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
     );
}
 
export default CategoryPage;