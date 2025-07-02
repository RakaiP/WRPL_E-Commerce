import getBillboards from "@/actions/get-billboard";
import Container from "../components/ui/container";
import Billboard from "../components/billboard";
import getProducts from "@/actions/get-products";
import ProductList from "../components/product-list";

export const revalidate = 0;

const HomePage = async () => {
    const products = await getProducts({isFeatured : true});
    const billboards = await getBillboards("9b19c0fb-89f8-4512-846a-a389ecb3ab37")

    return ( 
        <div>
            <Container>
                <div className="space-y-10 pb-10">
                    <Billboard data={billboards} />
                
                    <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                        <ProductList title="Featured Products" items={products} />
                    </div>
                </div>
            </Container>
        </div>
     );
}
 
export default HomePage;